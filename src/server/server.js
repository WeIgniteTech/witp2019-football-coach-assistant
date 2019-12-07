const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");
const cors = require('koa-cors');
const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Airtable credentials
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyRn88PFIqnmOc0s'}).base('appir4fX2DVduzuQT');

/* 
  This is the static part of the server: 
   it serves the 'build' directory
*/
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/../../build")); 
app.use(mount("/", static_pages));

app.use(BodyParser());
app.use(Logger());
app.use(cors());

/* 
  This is the API / dynamic part of the application
*/

/* 
  '/healthcheck' endpoint
  Returns "running" if everything is OK
*/
const healthcheck = router.get('/healthcheck',
  (ctx) => {
      console.log("Healthcheck handler", ctx.path);
      console.log(ctx.query);
      ctx.status = HttpStatus.OK;
      ctx.body = "Running";
})
app.use(healthcheck);

/* 
  '/api/now' endpoint
  This endpoint returns the actual date
*/
const now = router.get('/api/now',
  (ctx) => {
      console.log('path: ', ctx.path);
      console.log('query: ', ctx.query);
      ctx.status = HttpStatus.OK;
      const date = new Date();
      ctx.body = `{"today": "${date}"}`;
})
app.use(now);

/* 
  '/api/players' endpoint
  This endpoint returns the list of players from Airtable
*/
app.use(router.get('/api/players', async function (ctx) {
  try {
    const records = await getPlayers();
    console.log(`Retrieved ${records.length} records`);

    let playersList = [];
    records.forEach((record) => {
      playersList.push({
        "name": record.fields.Name,
        "attend": false
      });
    });

    ctx.body = playersList;
  } catch (err) {
    console.log('Got an error: ', err);
    ctx.body = "Failed :( ";
    // handle exception
  }
}));

// Function that returns all the records from the firstPage of a table in Airtable
// The table is here: https://api.airtable.com/v0/appir4fX2DVduzuQT/players?api_key=keyRn88PFIqnmOc0s 
// OBS: max 100 rows
// Inspired from: https://stackoverflow.com/a/58776599 
// You can also read other commands to AirTable here: https://flaviocopes.com/airtable/
function getPlayers() {
  return new Promise((resolve, reject) => {
    base('players').select({
      view: 'Grid view'
    }).firstPage(function (err, records) {
      if (err) {
        reject(err)
      } else {
        resolve(records);
      }
    });
  });
}

/*
 This is where we start the server 
*/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
