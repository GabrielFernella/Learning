// Fazendo uma listagem de clientes para os funcionários
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize'; // Operador do sequelize, para usar o between
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    // Verificando se o usuário é provider
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    // Localizando todos os agendamentos para o funcionário no dia
    const { date } = req.query;
    const parsedDate = parseISO(date);
    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointment);
  }
}

export default new ScheduleController();
