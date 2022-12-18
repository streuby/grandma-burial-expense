import asyncHandler from "express-async-handler";
import Photocard from "../models/photocardModel.js";

// @desc    Fetch all photocards
// @route   GET /api/photocards
// @access  Public
const getPhotocards = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Photocard.countDocuments({ ...keyword });
  const photocards = await Photocard.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ photocards, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single photocard
// @route   GET /api/photocards/:id
// @access  Public
const getPhotocardById = asyncHandler(async (req, res) => {
  const photocard = await Photocard.findById(req.params.id);

  if (photocard) {
    res.json(photocard);
  } else {
    res.status(404);
    throw new Error("Photocard not found");
  }
});

// @desc    Delete a photocard
// @route   DELETE /api/photocards/:id
// @access  Private/Admin
const deletePhotocard = asyncHandler(async (req, res) => {
  const photocard = await Photocard.findById(req.params.id);

  if (photocard) {
    await photocard.remove();
    res.json({ message: "Photocard removed" });
  } else {
    res.status(404);
    throw new Error("Photocard not found");
  }
});

// @desc    Create a photocard
// @route   POST /api/photocards
// @access  Private/Admin
const createPhotocard = asyncHandler(async (req, res) => {
  const photocard = new Photocard({
    name: "Sample name",
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "Sample category",
    numReviews: 0,
    description: "Sample description",
  });

  const createdPhotocard = await photocard.save();
  res.status(201).json(createdPhotocard);
});

// @desc    Update a photocard
// @route   PUT /api/photocards/:id
// @access  Private/Admin
const updatePhotocard = asyncHandler(async (req, res) => {
  const { name, description, image, category } = req.body;

  const photocard = await Photocard.findById(req.params.id);

  if (photocard) {
    photocard.name = name;
    photocard.description = description;
    photocard.image = image;
    photocard.category = category;

    const updatedPhotocard = await photocard.save();
    res.json(updatedPhotocard);
  } else {
    res.status(404);
    throw new Error("Photocard not found");
  }
});

// @desc    Create new review
// @route   POST /api/photocards/:id/reviews
// @access  Private
const createPhotocardReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const photocard = await Photocard.findById(req.params.id);

  if (photocard) {
    const alreadyReviewed = photocard.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Photocard already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    photocard.reviews.push(review);

    photocard.numReviews = photocard.reviews.length;

    photocard.rating =
      photocard.reviews.reduce((acc, item) => item.rating + acc, 0) /
      photocard.reviews.length;

    await photocard.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Photocard not found");
  }
});

// @desc    Get top rated photocards
// @route   GET /api/photocards/top
// @access  Public
const getTopPhotocards = asyncHandler(async (req, res) => {
  const photocards = await Photocard.find({}).sort({ rating: -1 }).limit(3);

  res.json(photocards);
});

export {
  getPhotocards,
  getPhotocardById,
  deletePhotocard,
  createPhotocard,
  updatePhotocard,
  createPhotocardReview,
  getTopPhotocards,
};
