import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import express from 'express';
import cors from "cors";
import UserRoutes from "./users/routes.js";
import FollowRoutes from "./followlist/routes.js";
import BookmarksRoutes from "./bookmarks/routes.js";
import CommentRoutes from "./comments/routes.js";
import RotdRoutes from "./rotd/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(
  session(sessionOptions)
);
UserRoutes(app);
FollowRoutes(app);
CommentRoutes(app);
BookmarksRoutes(app);
RotdRoutes(app);
app.listen(process.env.PORT || 4000);