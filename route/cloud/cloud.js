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
router.get("/:name", async (req, res) => {
  const {name} = req.params.name;
  try {
    const cloud = await prisma.media.findFirst({
      where: {
        name : {
          contains : name
        }
      },
    });
    if(!cloud){
      return res.status(404).send({ error: "Cloud not found" });
    }
    return res.json(cloud);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cloud = await prisma.media.delete({
      where: {
        id: id,
      },
    });
    return res.json(cloud);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/", async (req, res) => {
  try {
    const cloud = await prisma.media.deleteMany();
    return res.json(cloud);
  } catch (error) {
    console.log(error);
  }
});
export default router;
