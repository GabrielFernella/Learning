// Os arquivos da pasta lib são responsavéis por serviços adicionais a nossa aplicação
// Nesse aquivo, estamos gerenciando nossas filas para que execute um serviço de email de maneira rápida e segura
import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail'; // Deverá ser importado todos os jobs que tiver
import redisConfig from '../config/redis';

// aqui onde estará todos os serviços que estamos adicionado, funcionará como o index do database, onde carregará os models e etc
// Ou seja, quando ter um novo job, terá que carregalo nesse array
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // note que usamos um forEach e os dados que estamos utilizando estão sendo carregados do CancellarionMail
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Precisa adicionar novos trabalhos à fila assim que os emails forem disparados
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Além de add a fila, temos que processar novamente para que seja executado
  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
