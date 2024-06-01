import express from "express";

import multer from "multer";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/usr/src/app/uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  try {
    const cloud = await prisma.cloud.findFirst();
    if (!cloud) {
      cloud = await prisma.cloud.create();
    } else {
      await prisma.media.create({
        data: {
          cloud_id: cloud.id,
          path: file.filename,
          name: file.originalname,
        },
      });
    }

    res.send(cloud);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const cloud = await prisma.cloud.findMany({
      select: {
        created_at: true,
        updated_at: true,
        media: {
          select: {
            id: true,
            path: true,
            name: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
    return res.json(cloud);
  } catch (error) {
    console.log(error);
  }
});
export default router;
