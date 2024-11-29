import { Elysia, t } from "elysia";

export const example = (app: Elysia) =>
    app
        .get("/", () => "Hello World", {
            detail: {
                tags: ["Example"],
                summary: "getHello",
                description: "SAY MY NAME",
            },
        })
        .post(
            "/about",
            ({ body }) => {
                return {
                    id: "test",
                    msg: "Sub! " + body.name,
                };
            },
            {
                body: t.Object({
                    name: t.String(),
                }),
                detail: {
                    tags: ["Example"],
                    summary: "About",
                    description: "SAY YOUR NAME",
                },
            }
        );