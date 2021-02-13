import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue'; // serviço de envio de email

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20, // Limite de registros que serão exibidos
      offset: (page - 1) * 20, // conta para multiplicar os dados quando for para a pagina 2
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          // Aqui podemos relacionar os dados das outras tabelas
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { provider_id, date } = req.body;

    // check if provider_id is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }, // Verifica se é o mesmo id do user e se ele é provider
    });

    if (!isProvider || provider_id === req.userId) {
      // impedindo que o provider seja o mesmo que esta agendando
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // Check for past date
    const hourStart = startOfHour(parseISO(date)); // transdorma o objeto date arredondando a hora
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permitted' });
    }

    // Check date availability
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // Create agendamento
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    // Notificar Prestador de serviço
    const user = await User.findByPk(req.userId); // pegando os dados do usuário que está agendando o serviço
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    // Verify permission delete appointment
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "you don't have permission to cancel this appointment",
      });
    }

    // Permissions delete appointment for 2 hours
    const dateWihtSub = subHours(appointment.date, 2);
    if (isBefore(dateWihtSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel appointment 2 hours in advance' });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
