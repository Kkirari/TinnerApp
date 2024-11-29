import { profile } from "console";
import Elysia, { Static, t } from "elysia";
import { register } from "module";
import { _user, _UserAndToken } from "./user.type";
import { _register } from "./register.type";

export const _login = t.Object({
    username: t.String(),
    password: t.String(),
});



export const AccountDto = new Elysia().model({
    //request
    register: _register,
    login: _login,

    //response
    user_and_token: _UserAndToken
})


export type register = Static<typeof _register>
export type login = Static<typeof _login>