## Description

Blog API built with NestJS, GraphQL TypeORM, and PostgreSQL.

## Installation

```bash
$ npm install
```

## Configuration

See `.env.example` for a list of environment variables that need to be set in `.env` file.

## Migrations

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Docker
$ docker-compose up -d
```

## Test



```bash
# unit tests
$ npm run test
````
e2e tests require a running instance of the Postgres database. 
To run the tests, first start the database with docker-compose:

```bash
$ docker-compose up -d
```

Then run the tests:

```bash
# e2e tests
$ npm run test:e2e
```

## License

Nest is [MIT licensed](LICENSE).
