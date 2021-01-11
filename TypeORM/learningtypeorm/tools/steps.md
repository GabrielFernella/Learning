## 1 Criando Projeto

1. npm i typeorm -g (instalar globalmente)
2. typeorm init --name projectname --database pg (Criar projeto com typeorm)
3. npm install or yarn (instalar as dependências)
4. Edite o aquivo de config do ormconfig.json para conexão com o docker

## 2 Usando as migrations

1. npm run typeorm migration:create -- -n CreateClass (Criando a tabela no banco de dados)
2. yarn typeorm migration:run (Rodar as migrations disponíveis)
3. yarn typeorm migration:revert (só pode alterar uma migration se ela não foi enviada para o sistema)
4. yarn typeorm migration:show (visualizar todas as migrations)
