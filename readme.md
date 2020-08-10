# Teste Técnico

## Linguagem e ferramentas

O teste foi desenvolvido em NodeJs e MongoDB. Para os testes, foi utilizado o Mocha e para a API REST o Express.

## Estrutura

### Pastas

As pastas estão divididas em:

1. Api - Local das APIs REST, no caso só temos uma com o GET pedido implementado.
2. Banco - Local da implementação da persistência no MongoDB. As operações que eram necessárias foram implementadas no arquivo presente aqui.
3. Gateways - Local onde está o arquivo que implementa o Socket com o gatway de acesso para o envio dos dados de localização.
4. Testes - Testes unitários
5. Tradutores - Arquivos com implementação dos tradutores de Hexadecimal para o objeto com as informações do pacote.

### Arquivos

- Um arquivo [config.json](/config.json) foi criado para armazenar informações como string de conexão com o MongoDB, portas do gateway e API, e o HOST do gateway.
- O arquivo [index.js](/index.js) é o responsável por iniciar o gateway e a API.

## Execução

Para que o programa seja executado, basta executar o arquivo [index.js](/index.js). A execução pode ser feita pelo comando abaixo, uma vez que seu cmd esteja apontando para a pasta do projeto:

> node index.js

Obs.: Lembrando que é necessário ter o NodeJS e o MongoDB instalados.

## Onservações

Para este teste, foram assumidas algumas premissas de forma a simplificar o processo. Abaixo segue uma lista destas:

1. Os pacotes enviados são certos tanto em tamanho quanto em estrutura. Para que a aplicação fosse coerente com o cenário real, seria necessário fazer um tratamento na leitura do buffer no socket, garantindo que os dados repassados ao tradutor sejam apenas de um pacote. Como o socket TCP preenche continuamente o buffer, a solução se limita a recuperar os dados de um buffer que foi preenchido de forma ideal.
2. Foi interpretado que o comando PingACK seria enviado como resposta a um comando do Tipo 1, Ping. Dessa forma, somente mensagens com dados de localização são salvas, enquanto mensagens de ping são respondidas com um PingACK.
3. A API REST utiliza o localhost como HOST, e por default, no [config.json](/config.json), a porta 3000.
4. O gateway utiliza como default localhost como HOST e 9080 como porta.
5. Os dados retornados pelo GET da API foram os que julguei necessários para definir a localização atual do veículo.
6. Os testes cobrem as funções do tradutor. A API e a persistência não foram incluídos por dificuldades com a implementação.
7. NodeJS e MongoDB são tecnologias que eu não tenho contato constante e nem experiência profissional. Portanto, os conhecimentos necessários foram adiquiridos ao longo do desenvolvimento. Alguns exemplos:
   * Instalar e utilizar o MongoDB.
   * Instalar e utilizar o pacote Express.
   * Instalar e utilizar o pacote Mocha.
   * Desenvolver testers unitários em JS (testar comportamentos síncronos e assíncronos)

### Porque NodeJS e MongoDB?

Apesar da minha maior experiência profissional até o momento ser em C#, utilizando .NET Core e ASP.NET, a realidade é que minha experiência profissional se resume a dar manutenção em um código com grandes defeitos de arquitetura e práticas de programação. Portanto, não tive a oportunidade de desenvolver de forma efetiva nessa linguagem e com essas ferramentas. A criação de testes unitários, uso de frameworks para persistência de dados, arquiteturas de código, APIs REST, etc. A escolha de NodeJS e MongoDB se deu muito por conta desses fatores. Já que eu não tive experiência prática e de mercado com essas práticas e tecnologias utilizando o C#, julguei ser mais prático utilizar uma ferramenta com uso e desenvolvimento mais direto.
