![HTML badge](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS badge](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript badge](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NextJS badge](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind badge](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB badge](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# <img src="https://user-images.githubusercontent.com/105606295/221874628-e371951e-5a17-4570-8ecc-dfac851f8f86.png" width="40px" height="40px" alt="internet banking icon"><img> App - Ciclo de Pagamentos

## 📋 Descrição

Esta aplicação foi desenvolvida principalmente com NextJS e Tailwindcss, sendo inspirada por um projeto existente em um dos cursos da Cod3r Brasil. Tendo como principal objetivo a construção de uma área para gerenciamento de ciclos de pagamentos mensais.

Dentro da aplicação, um ciclo de pagamentos é definido por uma série de créditos e débitos lançados pelo usuário, gerando um balanço mensal com o total de créditos, débitos e o saldo resultante.

**Principais funcionalidades:**

-   Login e cadastro de usuários;
-   Criação, edição e exclusão de ciclos de pagamentos;
-   Visualização de todos os ciclos de pagamentos;
-   Resumo contendo o consolidado geral de créditos, débitos e o saldo resultante.

<br>

<img width="1100px" src="https://user-images.githubusercontent.com/105606295/222833255-0989288a-cab4-42e7-9d3c-04b64c971032.png" alt="application dashboard"/>

> **Note**
>
> -   O projeto faz uso do banco de dados em nuvem da MongoDB para persistir as informações de cada usuário.
> -   Os esquemas de banco de dados utilizados na aplicação foram definidos no próprio banco através do MongoDB Compass.

<br>

**Web-services utilizados:**

<table>
<tr>
<th>Rotas protegidas por JWT </th>
<th>Rotas públicas</th>
</tr>
<tr>
<td>

| Rota (Método)                    | Funcionalidade               |
| -------------------------------- | ---------------------------- |
| api/billing-cycles (GET)         | Consulta todos os ciclos     |
| api/billing-cycles/1 (GET)       | Consulta o ciclo de ID=1     |
| api/billing-cycles (POST)        | Cria um novo ciclo           |
| api/billing-cycles/1 (PUT)       | Altera o ciclo de ID=1       |
| api/billing-cycles/1 (DELETE)    | Apaga o ciclo de ID=1        |
| api/billing-cycles/summary (GET) | Obtém o consolidado geral    |
| api/users (GET)                  | Obtém informações do usuário |

</td>
<td>

| Rota (Método)     | Funcionalidade              |
| ----------------- | --------------------------- |
| api/login (POST)  | Efetua o login do usuário   |
| api/signup (POST) | Cadastra um novo usuário    |
| api/signout (GET) | Encerra a sessão do usuário |

</td>
</tr>
</table>

## 🎮 Iniciando o projeto

```r
1. Clone este repositório;
2. Com o terminal aberto, navegue até o diretório deste projeto;
3. Baixe as dependências deste projeto com npm install;
4. Crie um arquivo .env.local na raiz do projeto contendo as variáveis de ambiente presentes em .env.sample com valores de sua preferência.
5. Inicie a aplicação com npm run dev;
6. Navegue até http://localhost:3000/ para visualizar o projeto.
```

## 🚀 Stack do projeto

-   HTML
-   CSS
-   JavaScript
-   NextJS
-   TailwindCSS
-   MongoDB

## 📚 Outras libs

-   Bcrypt
-   Jose
-   React toastify
-   Yup

## 📝 Licença

MIT License © [LICENSE](./LICENSE)
