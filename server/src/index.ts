import { Elysia } from "elysia";
import { example } from "./controllers/example.controller";
import { SwaggerConfig } from "./configs/swagger.config";
import { tlsConfig } from "./configs/tls.config";
import cors from "@elysiajs/cors";
import { MongoDB } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";
import { AccountController } from "./controllers/account.controller";
import { UserController } from "./controllers/user.controller";
import staticPlugin from "@elysiajs/static";
import { PhotoController } from "./controllers/photo.controller";
import { LikeController } from "./controllers/like.controller";
import { ErrorController } from "./controllers/error.controller";
import { MessageController } from "./controllers/message.controller";



MongoDB.connect()
const app = new Elysia()
  .use(MessageController)
  .use(ErrorController)
  .use(cors())
  .use(SwaggerConfig)
  .use(jwtConfig)
  .use(LikeController)
  .use(example)
  .use(AccountController)
  .use(UserController)
  .use(PhotoController)
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))

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
console.log("Now date :", now.toLocaleString('th-TH'));