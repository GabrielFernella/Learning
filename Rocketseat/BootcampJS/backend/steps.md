# Modulo 1
## pacotes
 1. yarn init -y (criar o package.json)
 2. yarn add express
 3. yarn add sucrase nodemon -D (sucrase permite utilizar funções mais atualizadas do js)
 4. yarn add sequelize
 5. yarn add sequelize-cli -D (cli do sequelize para rodar comando no terminal)
 6. yarn add pg pg-hstore (Drivers para postgres)
 7. yarn add bcryptjs (para criar um hash de criptografia)
 8. yarn add jsonwebtoken
 9. yarn add yup (Biblioteca de schema validation)

## Comandos
 1. docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
 2. yarn sequelize migration:create --name=create-users (comando para criar um arquivo de migration, será salva na pasta onde a configuração foi indicada)
 3. yarn sequelize db:migrate (roda a migration para o banco de dados) yarn sequelize db:migrate:undo:all (para desfazer)
 4. lsof -i :3000 and kill PID (para WSL o package.json deve ficar assim "dev": "nodemon -L src/server.js") || pkill -f node ou pkill -f nodejs

## Processos
  1. Instale as principais dependências do seu projeto e organize a estrutura de arquivos
  2. crie os arquivos de configs na raiz, como o nodemon.json, .sequelizerc e os arquivos de config do editor, eslint e prettier
  3. instale seu ORM e crie sua primeira migration para o banco
  4. monte o model das suas tabelas e crie o index.js na pasta database para ele fazer a conexão com o banco de dados e carregar os models
  5. Crie os controllers e suas respectivas rotas


# Modulo 2
## pacotes 2
  1. yarn add multer (mult part form data, pacote que lida com vários tipos de arquivos)
  2. yarn add date-fns@next
  3. yarn add mongoose (ORM para banco mongodb)
  4. yarn add nodemailer (para testes com emails, vamos usar a ferramenta mailtrap)
  5. yarn add express-handlebars nodemailer-express-handlebars (HTML template engine)
  6. yarn add bee-queue (sistemas de fila que utiliza redis)
  7. yarn add @sentry/node (Ferramenta de tratamento de erros)
  8. yarn add express-async-errors (para o sentry conseguir captar os erros que acontecem utilizando o async await)
  9. yarn add youch (Usado para fazer uma tratativa das mensagens de erros para dar uma visualização melhor dos erros)
  10. yarn add dotenv (Montar suas variáveis de ambiente do app)

## Comandos 2
  1. yarn sequelize migration:create --name=create-files (Criando uma migration para criar uma tabela de files)
  2. yarn sequelize db:migrate
  3. yarn sequelize migration:create --name=add-avatar-field-to-users
  4. yarn sequelize migration:create --name=create-appointments
  5. docker run --name mongo -p 27017:27017 -d -t mongo (Instalação do mongo no Docker)
  6. docker run --name redis -p 6379:6379 -d -t redis:alpine (Instalação do Redis no Docker)

## Processos 2
19

 ### Criando relacionamentos com sequelize
   Grande parte da estrutura das nossas tabelas ficarão contidas dentro de models, onde ficara todas as informações que poderão ser editadas pelo usuário, como também no arquivo de migrations. Usando um exemplo da tabela Users desse projeto, e começando pelo arquivo de models, podemos notar o campo associate depois de realizar o schema dele, esse campo será passado para nosso arquivo index.js do banco, onde terá um .map que percorrerá todos os models e suas respectivas funções, no caso, init e associate. Através do associate podemos referenciar outras tabelas que tenha no nosso banco, mas antes disso, temos que ter definido a estrutura do nosso banco e feito as migrations da forma correta, para não ocasionar conflitos no nosso banco, ou seja, no nosso User fazemos uma referência da tabela Files, onde podemos encontrar o avatar do nosso usuário, referenciamos o campo "id" para avatar_id do nosso user. assim, podemos ter acesso ao restante dos campos quando formos utilizar as informações desse usuário em nosso Controller.
  Processos:
  1. Criar a migrations das tabelas, geralmente, utilizamos uma migrations posterior para poder fazer a conexão das tabelas, respeitando uma ordem de criação.
  2. Criarmos o arquivo models, e fazendo o relacionamentos através do método associate

### Envios de Email
  Durante esse processo, teremos que criar um arquivo de configuração, onde ficarão contidas as informações do nosso mailtrap, geralmente salvamos esses arquivos de configuração dentro da pasta 'config' do nosso projeto.

