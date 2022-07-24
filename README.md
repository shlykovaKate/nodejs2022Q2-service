# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/shlykovaKate/nodejs2022Q2-service.git
```

## Running application in docker

```
1) git checkout docker
2) npm run docker:up
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Stopping application in docker

```
npm run docker:down
```

# OR

## Installing NPM modules

```
1) git checkout development
2) npm install
```

## Copy and rename env.example to .env

```
If needed apply changes in .env file.
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## NPM script for vulnerabilities scanning

```
npm run docker:scan:app
npm run docker:scan:db
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
