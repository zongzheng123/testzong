import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

interface API {
  path: string;
  code: string
}

const app = new Hono();


const apis: Record<string, API> = {}
app.get("/heathz", (c: any) => c.text("OK"));

app.get("/api/update/:key", (c: any) => {
  const apiKey = c.req.param("key")
  apis[apiKey] = c.req.body
});

app.get("/api/:key", (c: any) => {
  const apiKey = c.req.param("key")
  const query = c.req.query
  const body = c.req.body
  const funCallArgs = Object.assign({}, query, body)
  const api = apis[apiKey]
  if (api) {
    return new Function(api.code)({
      args: funCallArgs
    })
  } else {
    return c.text("Not found");
  }
});

Deno.serve(app.fetch);
