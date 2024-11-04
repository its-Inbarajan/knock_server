import express from "express";
import multer from "multer";
import {
  createLists,
  getAllLists,
  getListById,
} from "../controllers/listsControllers";
const upload = multer({ dest: "uploads/" }); // Temporary storage path

const listRouter = express.Router();

listRouter.post("/createLists", upload.array("conver_photos"), createLists);
listRouter.get("/getLists", getAllLists);
listRouter.get("/getByIdLists/:id", getListById);
listRouter.put("/updateLists/:id", upload.array("conver_photos"));
listRouter.delete("/deleteLists/:id");

export default listRouter;
