
## Soccer matches skeleton service

## Description
Soccer matches service provides method to read and aggregate soccer matches results from 3rd party API's.

## Installation
### Prerequisites
You must have Node v20+ installed to install, build and run the application.
The rest of packages will be deployed automatically.

### Installation command
```bash
Node >=v20
$ npm install
```

## Running the app
### Setting the environment variables before running the app locally
Before running app locally you should have ***.env.local*** file placed in the ***/environment*** root directory.
The required variables can be copied from ***/environment/.env.local.example*** file.

### Building and running
Application provides set of NPM commands that builds and starts the application with different configuration.
Start command triggers all needed commands to run the application (build the package and host it using local Dev server).

```bash
# development in Linux/Mac
$ npm run start

# development in Linux/Mac watch mode
$ npm run start:dev

# development in Windows watch mode
$ npm run start:windows

# start in production mode
$ npm run start:prod
```

### Code styling
Application uses ***prettier*** tool to check code quality with default set of style rules.

```bash
# run Prettier to check the code style
npm run format:check

# correct all files to use Prettier code style
npm run format
```

### Testing
Application contains set of unit tests created. They are located in ***/test*** folders located in separate module folders.
Application provides set of NPM commands that run unit tests and measure coverage

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage
- To access API methods, please use ***/api*** starting path.
- API provides Open API documentation generated with Swagger library.

### Usefull links

```bash
# health
localhost:3000/api/health
```
```bash
# Open API documentation
localhost:3000/api/documentation-json
```
```bash
# Swagger UI
localhost:3000/api/documentation
```


## Deployment
Coming soon...
