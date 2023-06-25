import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { saveScreenshot } from "./save-screenshot";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      400: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/health", opts, async (request, reply) => {
  return { message: "It's Alive!" };
});
server.get("/screenshot", opts, async (request, reply) => {
  let url = undefined;
  let width = 1280;
  let height = 720;
  try {
    url = (request.query as Record<string, string>).url;
    width = (request.query as Record<string, string>).width
      ? parseInt((request.query as Record<string, string>).width)
      : 1280;
    height = (request.query as Record<string, string>).height
      ? parseInt((request.query as Record<string, string>).height)
      : 720;
  } catch (error) {}
  if (url) {
    const screenshot = await saveScreenshot(url, width, height);
    if (screenshot) {
      reply.type("image/png");
      reply.header("Content-Length", screenshot.length);
      reply.send(screenshot);
    } else {
      reply.status(500).send({ message:"Error generating screenshot", error: "Unknown Error"});
    }
  } else {
    reply.status(400).send({ message:"Missing url query parameter", error: "Missing Parameter"});
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    // const address = server.server.address();
    // const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
