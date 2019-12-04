const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");

const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");

const request = require('request');

const app = new Koa();
const PORT = process.env.PORT || 3000;

/* 
  This is the static part of the server: 
   it serves the 'build' directory
*/
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/../../build")); 
app.use(mount("/", static_pages));

app.use(BodyParser());
app.use(Logger());


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
  This endpoint returns the actual date
*/

const players_OLD = router.get('/api/players_OLD',
    (ctx) => {
        console.log('path: ', ctx.path);
        console.log('query: ', ctx.query);
        ctx.status = HttpStatus.OK;
        const Url = "https://api.airtable.com/v0/appir4fX2DVduzuQT/players?api_key=keyRn88PFIqnmOc0s";

        var json = request(Url);
        ctx.set('Content-Type', 'application/json');

        /*
        console.log('json ------->', json);
        var playersList = [];
        var records = json.Records;

        records.forEach(function (record) {
            var aPlayer;
            aPlayer.name = record.fields.Name;

            aPlayer.position = record.fields.Position;
            aPlayer.attending = false;

            playersList.push(aPlayer);
        });*/
        //ctx.body = playersList;
        console.log('json ------->', json);

        ctx.body = json;
    })
app.use(players_OLD);



const players = router.get('/api/players', async (ctx) => {
    try {
        const record = await getBase();
        console.log('Retrieved', record.id);
        ctx.body = "Record ID from API: " + record.id;
    } catch (err) {
    }
});
app.use(players);


function getBase() {
    return new Promise((resolve, reject) => {
        base('appir4fX2DVduzuQT').find('keyRn88PFIqnmOc0s', function (err, record) {
            console.log('Retrieved', record.id);
            if (err) {
                reject(err)
            } else {
                resolve(record);
            }
        });
    });
}

async function getPlayers() {
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'keyRn88PFIqnmOc0s' }).base('appir4fX2DVduzuQT');

    var recordsList = [];
    base('players').select({
        view: 'Grid view'
    }).firstPage(function (err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function (record) {
            recordsList.push(record);
            console.log('Retrieved', record.get('Name'));
        });
    });
    return recordsList;
}


/*
 This is where we start the server 
*/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
