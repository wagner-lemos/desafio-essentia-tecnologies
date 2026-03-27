### Teste Técnico Essentia - Techx To-Do List

Desenvolvimento de uma solução com Angular no frontend e Node no backend integrado ao banco de dados mySQL e MongoDB, contendo funcionalidades para cadastro e login de usuários, com listagem, cadastro, edição e exclusao de uma to-do list. Os itens precisam estar atrelados ao login do usuário.

#### Requesitos
```
• NodeJS (v22.16) com Express;
• Typescript (v5.9) para tipagem;
• Angular CLI (v20.3)
• JsonWebToken e Bcrypt pata autenticação e segurança;
• Express Async Errors para gerenciamento de erros
• MySQL e MongoDB configurados no Docker para rodar localmente;
```
#### Instalaçãp
```
• Clone o projeto:
git clone https://github.com/wagner-lemos/desafio-essentia-tecnologies.git
```
#### Docker - Ative containers
```
• docker compose up -d

OBS: O MySQL pode demorar um pouco para subir, caso ocorra algum erro ao executar o sistema, espere um pouco mais e tente novamente.
```
#### Backend instalação
```
• cd backend
• Configure o .env (Já Configurado para teste);
• npm install
• npm run dev
• O backend iniciará na porta: 3000
```
#### Frontend instalação
```
• cd frontend
• Configure o environment.ts com a rota da API (Já Configurado para teste);
• npm install
• npm start
• O backend iniciará na porta: 4200
```

##### Duvidas
```
Wagner Lemos (wagnerlemosce@gmail.com)
```