import Elysia, { error, t } from "elysia";
import { ImageHelper } from "../helpers/image.helper";
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleware";
import { PhotoService } from "../services/photo.service";



export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})

    .use(PhotoDto)
    .use(AuthMiddleWare)

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)

        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error('something went wrong')
        }
    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: 'photo',
        isSignIn: true
    })