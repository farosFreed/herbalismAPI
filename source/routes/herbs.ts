import express from "express";
import controller from "../controllers/herbs";
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});
router.get("/herbs", controller.getHerbs);
router.get("/herbs/:herbname", controller.getHerb);
// router.delete("/herbs/:herbname", controller.deleteHerb);
router.post("/herbs", controller.addHerb);

export = router;
