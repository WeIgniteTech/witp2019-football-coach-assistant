# Football coach assistant

[insert here a short description of the application (with f.ex the main features of the application)]

## Technical architecture
The application is composed of: 
 - a front-end served by a Koa server
 - a back-end API
 - a configuration to run on CircleCI (TODO: Not implemented yet!)

The backend API returns today's date in text format 
`{'today': '...'}`


## Available Scripts (npm)

### `npm start`

Start the application in development mode (with _runtime reload_)

### `npm test`

Runs all the test

### `npm run-script build`

This command will build your application into the `/build` folder

### `node src/server/server.js`

This will run your application as it should run on the server. You need to rund the build before that (`npm run-script build`)
The static part of the serve will serve files located into the `build` folder.

## Local testing

Open [http://localhost:3000](http://localhost:3000) to view it in the browser

Use Postman to test the API enpoints available like [http://localhost:3000/api/now](http://localhost:3000/api/now) for example

## References
https://medium.com/hackernoon/serving-react-and-koa-together-720ba6668298 



