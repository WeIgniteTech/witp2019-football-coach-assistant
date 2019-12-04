const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");
const cors = require('koa-cors');
const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");


const app = new Koa();
const PORT = process.env.PORT || 5000;

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
  This endpoint returns the actual date
*/
const players = router.get('/api/players',
    (ctx) => {
        console.log('path: ', ctx.path);
        console.log('query: ', ctx.query);
        ctx.status = HttpStatus.OK;
        const date = new Date();
        ctx.body = "[\n         {\n           \"name\": \"Vinh\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Thomas\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Tahir\",\n           \"attend\": false \n         },\n         {\n           \"name\": \"Boushra\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Gayathri\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Ingar\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Mary\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Maha\",\n           \"attend\": false\n         },\n         {\n           \"name\": \"Erlend\",\n           \"attend\": false\n         }\n       ]";
    })
app.use(players);

/*
 This is where we start the server 
*/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
