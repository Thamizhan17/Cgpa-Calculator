import { Hono } from "hono";
import extractCgpaRoutes from "./routes/extract-cgpa";

const app = new Hono<{ Bindings: Env }>();

app.route('/api', extractCgpaRoutes);

export default app;
