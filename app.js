import express from "express";
import upload from "./route/cloud/cloud.js";
import path from 'path'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join("/usr/src/app/uploads")));
const PORT = 3000;
app.use("/", upload);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
