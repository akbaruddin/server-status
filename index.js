const fastify = require("fastify")({ logger: true });

fastify.register(require("under-pressure"), {
  maxEventLoopDelay: 1000,
  message: 'Under pressure!',
  retryAfter: 50,
  exposeStatusRoute: {
    routeOpts: {
      logLevel: 'debug',
      config: {
        someAttr: 'value'
      }
    },
    routeSchemaOpts: { // If you also want to set a custom route schema
      hide: false
    },
    url: '/status' // If you also want to set a custom route path and pass options
  }
});

fastify.get("/", async (request, reply) => {
  return { hello: "world", mem: fastify.memoryUsage() };
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
