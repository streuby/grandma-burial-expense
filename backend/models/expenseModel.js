import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    expenseService: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },

    serviceProvider: {
      name: { type: String, required: true },
      email: { type: String, required: false },
      phone: { type: String, required: true },
      bank: { type: String, required: true },
      account: { type: String, required: true },
    },
    image: { type: String, required: false },
    isSample: {
      type: Boolean,
      required: true,
      default: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
