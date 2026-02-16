import { Hono } from "hono";
import extractCgpaRoutes from "./routes/extract-cgpa";
const app = new Hono();
app.route('/api', extractCgpaRoutes);
export default app;
