import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

let blogpost = [
  {
    id: "1",
    title: "Blog1",
    content: "blog1 posts",
  },
  {
    id: "2",
    title: "Blog2",
    content: "blog2 posts",
  },
  {
    id: "3",
    title: "Blog3",
    content: "blog3 posts",
  },
];



app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/posts",(c) => c.json({posts: blogpost}))

app.get("/posts/:id", (c) => {
  const id = c.req.param("id");
  const post = blogpost.find((p) => p.id === id);

  if (post) {
    return c.json(post);
  }else {
    return c.json({message: "not found"}, 404)
  }
});

app.post("/posts", async (c) => {
  const {title, content} = await c.req.json<{ title: string; content: string }>()
  const newPost = {id: String(blogpost.length + 1), title, content }
  blogpost = [...blogpost, newPost];
  return c.json(newPost, 201);
});

export default app;
