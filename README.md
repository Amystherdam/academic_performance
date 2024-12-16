# Academic Performance

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)![Tailwindcss](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Olá! Obrigado por disponibilizar um pouco do seu tempo. Abaixo estão todas as informações que você precisa sobre o projeto, desde testar manualmente até a documentação geral. Se trata de uma interface que consome uma API. Essa interface é capaz de

- Lista os melhores estudantes
- Lista o histórico de notas dos estudantes
- Listar os fechamentos mensais dos estudantes por disciplina e o geral

Agora vamos falar um pouco sobre a estrutura do projeto. Aliás, esse projeto é apenas a interface e ela é complementada por uma API que está [nesse outro repositório](https://github.com/Amystherdam/academic_performance_api) que contém seu próprio README.

## Gestão do projeto

Todas as issues do projeto foram inseridas e ligeiramente documentadas no github projects através de descrições de problemas e checklists de resolução. Acesse o [board aqui](https://github.com/users/Amystherdam/projects/7/views/2)

## Versões

- React 19.0.0
- tailwindcss 3.4.16
- typescript 5.6.2
- Mais informações de versões no `package.json`

## Diagrama de Pastas

O diagrama de pastas é bem simples e padrão de mercado para um projeto desse porte. Tem uma pasta `components` onde estão os componentes da aplicação. Nesse caso cada componente fico sendo uma página também, mas, em projetos maiores pode-se ter pastas exclusivas e componentes aninhados a seus componentes pai.

Tem uma pasta `service` onde foi colocado o invólucro do `axios` para as consultas ao backend. Além disso, alguns componentes soltos na raiz como `routes` e `app`

A visão é basicamente a que está abaixo

![Image](https://github.com/user-attachments/assets/3bde195c-d80b-4333-8663-f0f99c89472a)

### Componentes / Páginas

Existem 6 tabelas no projeto

- `AverageByStudentSubjects`
- `GradesHistory`
- `MainContainer`
- `NavBar`
- `Ranking`
- `Students`

#### AverageByStudentSubjects

Esse componente é responsável por consultar o endpoint de Média de estudante por disciplina, isto é, as médias finais das disciplinas do aluno. Também existem alguns tratamentos de erros do `axios` e para arrays de resposta vazios

#### GradesHistory

Esse componente é responsável por consultar o endpoint de histórico de notas gerais por aluno, isto é, todas as notas do aluno. Também existem alguns tratamentos de erros do `axios` e para arrays de resposta vazios.

#### MainContainer

Esse componente é responsável por centralizar os componentes filhos em um espaço do DOM. Ele é pai de todas as rotas, geralmente esse tipo de componente é um bom lugar para colocar menus gerais como SideBar, NavBar e etc.

#### NavBar

Esse componente é responsável por por criar um menu de navegação superior com as rotas para `Students` e `Ranking`

#### Ranking

Esse componente é responsável por consultar o endpoint de melhores notas gerais do ciclo, isto é, um ranking dos melhores alunos. Também existem alguns tratamentos de erros do `axios` e para arrays de resposta vazios.

#### Students

Esse componente é responsável por consultar o endpoint de alunos, ela é um componente coringa, pois, tem outros links na tabela de estudantes. Também existem alguns tratamentos de erros do `axios` e para arrays de resposta vazios.

## Testes

Existe um teste feito em `playwright` que faz um teste de integração entre todas as telas do frontend, por alguns problemas com imagens do `playwright` não consegui colocar esse teste em um container.

Os testes Jest + RTL estão no docker e podem ser executados

## Docker

A aplicação está rodando com docker. Existem dois arquivos `.yml`, o próprio `docker-compose.yml` e o `docker-compose.test.yml`

O último roda justamente os testes, decidi separar para não rodar a suite de teste toda vez que o projeto iniciar.
O compose principal tem as configurações pertinentes ao react.

### Rodando o projeto

Para rodar a API web basta executar o docker-compose.yml

```
docker-compose up --build
```

Ou com flag `-d` para segundo plano

Para rodar a suite de testes, você pode executar

```
docker-compose -f docker-compose.test.yml up --build --exit-code-from jest
```

Rode em primeiro plano para ver a CI executando

## Adicionais

Foi implementado um arquivo de CI para o github actions que roda testes da aplicação a cada PR enviado e também na branch `main`

## Agradecimento

Foi um prazer escrever essa doc pra você, obrigado por ler até aqui, estou a disposição para o que precisar! 💎🎉🙂
