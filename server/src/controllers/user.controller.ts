import Elysia from "elysia";
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleware";
import { UserDto } from "../types/user.type";
import { UserService } from "../services/user.service";


export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})

    .use(AuthMiddleWare)
    .use(UserDto)

    .get("/all", () => {
        return {
            user: [
                { id: "666", name: "Jonathan Joestar" },
                { id: "123", name: "Dio Brando" }
            ]
        }
    },)

    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    },
        {
            detail: { summary: "Get user" },
            query: "pagination",
            Response: "users",
            isSignin: true,
        })

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = 'No Content'
        } catch (error) {
            set.status = 'Bad Request'
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Something went wrong ,Try again')
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        // response: "user",
        isSignIn: true
    })