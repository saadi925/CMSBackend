import express, { Router } from "express";

import { authRoutes, courseRoutes, blogRoutes } from "./routes";
import connectToMongo from "./utils/database";
const app = express();
const port = 5000;
import cors from "cors";
import createAdminUser from "./utils/adminUser";
// Middleware
app.use(cors());
app.use(express.json());
connectToMongo();
createAdminUser();

// Routes

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/course", courseRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
