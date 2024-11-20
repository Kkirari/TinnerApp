import { Elysia } from "elysia";
import { example } from "./controllers/example.controller";
import { SwaggerConfig } from "./configs/swagger.config";
import { tlsConfig } from "./configs/tls.config";
import cors from "@elysiajs/cors";
import { MongoDB } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";


MongoDB.connect()
const app = new Elysia()
  .use(cors())
  .use(SwaggerConfig)
  .use(jwtConfig)
  .use(example)

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig,
  });

let protocol = "http";
if ("cert" in tlsConfig) protocol = "https";
console.log(
  `🧙‍♂️ Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`
);
const now = new Date();
console.log("Now date :",now.toLocaleString('th-TH')); 





