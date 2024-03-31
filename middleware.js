const Listing = require("./models/listing")
const ExpressError = require("./utils/expressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.validateListing = (req, res, next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
      let errMsg = error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400, errMsg)
    } else{
      next()
    }
  }

module.exports.isloggedIn =(req,res,next)=>{
    console.log(req.path ,"..",  req.originalUrl);
    // redirectUrl save;
    if(!req.isAuthenticated()){
        req.session.redirectUrl =req.originalUrl;
        req.flash("error", "you must be  logged in to continue")
       return res.redirect("/login")
      }
      next();
}



module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
         req.flash("error" , ("you're not the owner of the Listing"))
      return   res.redirect(`/listings/${id}`)
    }
    next()
}


module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400, errMsg)
      } else{
        next()
      } }
module.exports.isAuthor = async(req, res, next)=>{ 
   let{reviewId, id} = req.params;
   let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error" , "you are not the author of review");
    return res.redirect(`/listings/${id}`);
   }
   next()
}
