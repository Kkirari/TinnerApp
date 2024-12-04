import Elysia, { t } from "elysia";

export const PhotoContoller = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})

    .post('/', async ({ body: { imgFile } }) => {
        const filename = `${Date.now()} - ${imgFile.name}`
        const filePath = `public/uploads/${filename}`
        const buffer = await imgFile.arrayBuffer()
        await Bun.write(filePath, buffer)
        return `https://localhost:8000/img/Starplatinum.jpg`
    }, {
        detail: { summary: "Upload Photo" },
        body: t.Object({
            imgFile: t.File()
        })
    })