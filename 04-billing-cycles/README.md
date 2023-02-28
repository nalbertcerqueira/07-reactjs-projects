![HTML badge](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS badge](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript badge](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NextJS badge](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind badge](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

# <img src="https://user-images.githubusercontent.com/105606295/221874628-e371951e-5a17-4570-8ecc-dfac851f8f86.png" width="50px" height="50px" alt="internet banking icon"><img> App - Cíclo de Pagamentos

## 📋 Descrição

Esta aplicação foi desenvolvida principalmente com NextJS e Tailwindcss, sendo inspirada por um projeto existente em um dos cursos da Cod3r Brasil. Tendo como principal objetivo a construção de uma área para gerenciamento de cíclos de pagamentos mensais.

Dentro da aplicação, um ciclo de pagamentos é definido por uma seríe de créditos e débitos lançados pelo usuário, gerando um balanço mensal com o total de créditos, débitos e o saldo resultante.

**Principais funcionalidades:**

-   Login e cadastro de usuários;
-   Criação, edição e exclusão de ciclos de pagamentos;
-   Visualização de todos os cíclos de pagamentos;
-   Resumo contendo o consolidado geral de créditos, débitos e o saldo resultado.

<div align="left">
    <img width="575px" src="https://user-images.githubusercontent.com/105606295/221878736-a432e707-8bf0-46b4-b6b3-d0b2ab039f14.png" alt="application dashbord"/>
    <img width="480px" src="https://user-images.githubusercontent.com/105606295/221897219-4170596c-ea76-44bc-93f8-5f36ab09fcbd.png" alt="billing cycle register"/>
</div>

<br>

> **Note**
> O projeto faz uso do gerenciamento nativo de APIs do NextJS para alcançar a persistência de dados através de arquivos .json atuando como _fake database_ para armazenar as informações de cada usuário.

<br>

**Web-services utilizados:**

<table>
<tr>
<th>Rotas públicas</th>
<th>Rotas protegidas por JWT </th>
</tr>
<tr>
<td>

| Rota (Método)             | Funcionalidade              |
| ------------------------- | --------------------------- |
| api/login (POST)          | Eeftua o login do usuário   |
| api/signup (POST)         | Cadastra um novo usuário    |
| api/logout (GET)          | Encerra a sessão do usuário |
| api/auth-validation (GET) | Valida o JWT do usuário     |

</td>
<td>

| Rota (Método)                    | Funcionalidade              |
| -------------------------------- | --------------------------- |
| api/billing-cycles (GET)         | Consulta todos os cíclos    |
| api/billing-cycles/1 (GET)       | Consulta o cíclo de ID=1    |
| api/billing-cycles (POST)        | Cria um novo cíclo          |
| api/billing-cycles/1 (PUT)       | Altera o cíclo de ID=1      |
| api/billing-cycles/1 (DELETE)    | Apaga o cíclo de ID=1       |
| api/billing-cycles/summary (GET) | Obtem o o consolidado geral |

</td>
</tr>
</table>

## 🎮 Iniciando o projeto

```r
1. Clone este repositório;
2. Com o terminal aberto, navege até o diretório deste projeto;
3. Baixe as dependências deste projeto com npm install;
4. Altere a chave privada (AUTH_SECRET) em .env.local na raiz do projeto para uma chave do seu gosto;
4. Inicie a aplicação com npm run dev;
5. Em seu navegador navega até http://localhost:3000/ para visualizar o projeto.
```

## 💻 Stacks utilizadas

-   HTML
-   CSS
-   JavaScript
-   NextJS
-   TailwindCSS

## 💵 Licença

**O uso de todos os arquivos deste projeto é limitado apenas para fins de estudos.**
