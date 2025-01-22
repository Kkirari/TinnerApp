import Elysia from "elysia";
import { jwtConfig } from "../configs/jwt.config";
import { AccountDto } from "../types/account.type";
import { AccountService } from "../services/account.service";
import { _UserAndToken } from "../types/user.type";

export const AccountController = new Elysia({
  prefix: "/api/account",
  tags: ["Account"],
})
  .use(jwtConfig)
  .use(AccountDto)

  .post(
    "/login",
    async ({ body, jwt, set }) => {
      try {
        const user = await AccountService.login(body);
        const token = await jwt.sign({ id: user.id });
        return { user, token };
      } catch (error) {
        set.status = "Bad Request";
        if (error instanceof Error) throw new Error(error.message);
        set.status = "Internal Server Error";
        throw new Error("Some Thing went wrong , try again later");
      }
    },
    {
      detail: { summary: "Login" },
      body: "login",
      response: _UserAndToken,
    }
  )

  .post(
    "/register",
    async ({ body, jwt, set }) => {
      try {
        const user = await AccountService.createNewUser(body);
        const token = await jwt.sign({ id: user.id });
        return { token, user };
      } catch (error) {
        set.status = "Bad Request";
        if (error instanceof Error) throw new Error(error.message);
        set.status = 500;
        throw new Error("Something wen wrong, try again later");
      }
    },
    {
      body: "register",
      response: _UserAndToken,
      detail: {
        summary: "create New User",
      },

      beforeHandle: ({ body: { username, password }, set }) => {
        const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,19}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
          set.status = "Bad Request";
          throw new Error(`Invalid username or password`);
        }
      },
    }
  );
