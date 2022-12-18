import express from "express";
import {
  addExpenseItems,
  getExpenseById,
  updateExpenseToPaid,
  updateExpenseToDelivered,
  getMyExpenses,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, admin, addExpenseItems).get(getExpenses);
router.route("/myexpenses").get(protect, getMyExpenses);
router.route("/:id").get(protect, getExpenseById);
router.route("/:id").put(protect, admin, updateExpense);
router.route("/:id/pay").put(protect, updateExpenseToPaid);
router.route("/:id/deliver").put(protect, admin, updateExpenseToDelivered);

export default router;
