import express from "express";
import fs from "fs";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/usr/src/app/uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage : storage})

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  res.send({filepath : file.path});
});

export default router;
