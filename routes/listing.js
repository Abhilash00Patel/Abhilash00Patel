if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
// console.log(process.env.SECRET) ;

const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")

const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn , isOwner, validateListing} = require("../middleware.js")
const {storage} = require("../cloudConfig.js")

const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const upload = multer({storage})

//index route  //create route
router.route("/")                              
.get(wrapAsync(listingController.index))
.post(isloggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isloggedIn,listingController.renderNewForm)

//show Route  //update Route //Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner, wrapAsync(listingController.destroyListing));

//edit Route 
router.get("/:id/edit",isloggedIn, isOwner,wrapAsync(listingController.renderEditform))


module.exports = router;





