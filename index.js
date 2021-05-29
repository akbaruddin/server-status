const Koa = require("koa");
const router = require("koa-router");
const monitor = require("koa-monitor");
const app = new Koa();
const _ = router();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(monitor(app, { path: '/status' }))

app.use((ctx) => {
  ctx.body = "Hello World";
});

app.use(_.routes());
app.listen(3000);
