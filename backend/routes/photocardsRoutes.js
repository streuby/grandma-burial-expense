import express from "express";
import {
  getPhotocards,
  getPhotocardById,
  deletePhotocard,
  createPhotocard,
  updatePhotocard,
  createPhotocardReview,
  getTopPhotocards,
} from "../controllers/photocardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getPhotocards).post(protect, admin, createPhotocard);
router.route("/:id/reviews").post(protect, createPhotocardReview);
router.get("/top", getTopPhotocards);
router
  .route("/:id")
  .get(getPhotocardById)
  .delete(protect, admin, deletePhotocard)
  .put(protect, admin, updatePhotocard);

export default router;
