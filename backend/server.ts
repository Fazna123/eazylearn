//import { Request, Response } from "express";
import createServer from "./configs/app";
import connectDB from "./configs/db";

import dotenv from "dotenv";

dotenv.config();

import userRoute from "./routes/user.route";
import adminRoute from "./routes/admin.route";

const { app, server } = createServer();

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

// app.all("*", (req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Invalid Route in URL",
//   });
// });

server.listen(process.env.PORT, () => {
  console.log("Server listening on http://localhost:8000");
  connectDB();
});
