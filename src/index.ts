import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.route";
import articleRoute from "./routes/article.route";
import commentRoute from "./routes/comment.route";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;

// Allows the data from the client
// app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
