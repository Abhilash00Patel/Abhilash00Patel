const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js")
const {validateReview, isloggedIn ,isAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");


router.post("/" ,isloggedIn,validateReview, wrapAsync(reviewController.createReview));
 //delete review route
 router.delete("/:reviewId",isloggedIn,isAuthor,wrapAsync(reviewController.destroyReview));

 module.exports = router; 

