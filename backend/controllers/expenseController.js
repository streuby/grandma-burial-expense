import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const addExpenseItems = asyncHandler(async (req, res) => {
  console.log(req.user.isAdmin);
  const expense = new Expense({
    expenseService: { name: "Sample Expense Name", price: 0.0 },
    user: req.user._id,
    serviceProvider: {
      name: "Sample Name",
      email: "Sample email",
      phone: "09809768976",
      bank: "Sample Bank",
      account: "******3245",
    },
    image: "/images/sample.jpg",
  });

  const createdExpense = await expense.save();

  res.status(201).json(createdExpense);
});

// @desc    Fetch all expenses
// @route   GET /api/expenses
// @access  Public
const getExpenses = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Expense.countDocuments({});
  const expense = await Expense.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ expense, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get expense by ID
// @route   GET /api/expenses/:id
// @access  Private
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Update a expense
// @route   PUT /api/expenses/:id
// @access  Private/Admin
const updateExpense = asyncHandler(async (req, res) => {
  const { expenseService, serviceProvider, image } = req.body;

  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.expenseService.name = expenseService.name;
    expense.expenseService.price = expenseService.price;
    expense.serviceProvider.name = serviceProvider.name;
    expense.serviceProvider.email = serviceProvider.email;
    expense.serviceProvider.phone = serviceProvider.phone;
    expense.serviceProvider.bank = serviceProvider.bank;
    expense.serviceProvider.account = serviceProvider.account;
    expense.image = image;
    expense.isSample = false;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Update expense to paid
// @route   GET /api/expenses/:id/pay
// @access  Private
const updateExpenseToPaid = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.isPaid = true;
    expense.paidAt = Date.now();

    const updatedExpense = await expense.save();

    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Update expense to delivered
// @route   GET /api/expenses/:id/deliver
// @access  Private/Admin
const updateExpenseToDelivered = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.isDelivered = true;
    expense.deliveredAt = Date.now();

    const updatedExpense = await expense.save();

    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Get logged in user expenses
// @route   GET /api/expenses/myexpenses
// @access  Private
const getMyExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
});

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private/Admin
const getExpensesByUserId = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({}).populate("user", "id name");
  res.json(expenses);
});

export {
  addExpenseItems,
  getExpenseById,
  updateExpenseToPaid,
  updateExpenseToDelivered,
  updateExpense,
  getMyExpenses,
  getExpenses,
  getExpensesByUserId,
};
