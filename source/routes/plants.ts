/** source/routes/plants.ts */
import express from "express";
import controller from "../controllers/plants";
const router = express.Router();

router.get("/plants", controller.getPlants);
router.get("/plants/:id", controller.getPlant);
router.put("/plants/:id", controller.updatePlant);
router.delete("/plants/:id", controller.deletePlant);
router.post("/plants", controller.addPlant);

export = router;
