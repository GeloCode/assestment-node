# Assesment API REST Node

### Installation

Node & npm are a must, go into project's root folder

```bash
npm install
```

### How to run

Run the script:

```bash
npm run dev
```

### How to test

Scripts for testing:

Execute all tests

```bash
npm run test
```

Unit

```bash
npm run test:unit
```

Integration

```bash
npm run test:int
```

E2E

```bash
npm run test:e2e
```

Watch
```bash
npm run test:watch
```

Coverage
```bash
npm run test:coverage
```

### Consume the API

First of all you'll need to login in the next url: http://localhost:3000/login for this you'll need an username & password.

If you want to use user with role admin:
```
{
    "username": "Britney",
    "password": "britneyblankenship@quotezart.com"
}
```
If you want to use user with role user:
```
{
    "username": "Lamb",
    "password": "lambblankenship@quotezart.com"
}
```

After you call the endpoint you'll receive a token in this format:
```
{
    "token": "TOKEN WILL BE HERE",
    "type": "Bearer",
    "expires_in": 900
}
```

Right now with this token you can consume the REST API, I'd suggest to go to http://localhost:3000/swagger/ to check all available endpoints with the format and the error format types available for each resource.

### Design

    .
    ├── __test__                # Automated tests (alternatively `spec` or `tests`)
    ├── config                  # Configuration files one for each environment
    └── src                     # Source files                   
      └── controllers           # Logic related with each resource example: policies            
      └── middlewares           # Middlewares that are going to be used in the app to handle when we need to continue with the request or send error message            
      └── routes                # Router of each resource and asigning Controller function for each path             
      └── utils                 # Utilities such as pagination, filterByQuery             
      └── app.js                # App             
      └── server.js             # Server exposing the app in PORT defined in CONFIG folder
    ├── swagger.json            # Documentation of the API
    └── README.md               # Documentation of the project

