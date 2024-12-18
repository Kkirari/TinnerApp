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

    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await PhotoService.setAvatar(photo_id, user_id)
            set.status = 'No Content'
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error('something went wrong')
        }
    },
        {
            detail: { summary: 'Delete photo by user_id' },
            isSignIn: true,
            params: "photo_id"
        })

    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = 'No Content'
        } catch (error) {
            set.status = "Bad Request"
        }
    }, {
        detail: { summary: 'Delete photo by user_id' },
        isSignIn: true,
        params: "photo_id"
    })

    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhoto(user_id)
    }, {
        detail: { summary: 'get photo[] by user_id' },
        isSignIn: true,
        response: "photos"

    })

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