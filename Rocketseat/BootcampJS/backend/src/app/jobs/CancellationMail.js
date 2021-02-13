// Arquivo destinado a fazer funções em segundo plano
import { format, parseISO } from 'date-fns'; // para tratar o formato da data quando retornar para o html
import pt from 'date-fns/locale/pt'; // converter para pt-br o tipo de data
import Mail from '../../lib/Mail'; // Arquivo de envio de email

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // Variável responsável por pegar todos do dados que vem do appointment delete, para que possamos utilizar as infos do usuário
    const { appointment } = data;

    // vc pode mandar o email utilizando o await ou o redis (Baco chave valor)
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
