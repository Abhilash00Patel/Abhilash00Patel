const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/expressError.js");
const passport = require("passport");
// const {isloggedin} = require("../middleware.js")
const {saveRedirectUrl} = require("../middleware.js");
// const { renderSignupForm, signup, renderLoginForm, login, logout } = require("../controllers/users.js");

const userController = require("../controllers/users.js");

//signup Routes
//get
router.get("/signup", userController.renderSignupForm)
//post2
router.post("/signup" , wrapAsync(userController.signup));

//login Routes
//get
router.get("/login" ,userController.renderLoginForm)
//post
router.post("/login" ,passport.authenticate("local",{failureRedirect:"/login", failureFlash: true}), saveRedirectUrl,userController.login )
//logout
router.get("/logout" , userController.logout)

module.exports = router; 


