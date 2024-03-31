const Listing = require("../models/listing");
const Review =  require("../models/review");


module.exports.createReview = async(req,res)=>{
    console.log(req.params.id)
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    console.log(newreview);
     listing.review.push(newreview);
     await newreview.save();
     await listing.save();
     req.flash("success" , "review added!");
 
     res.redirect(`/listings/${id}`)
 }


 module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId)
  await Listing.findByIdAndUpdate(id , {$pull :{review: reviewId}});
  req.flash("success" , "review deleted!");
  res.redirect(`/listings/${id}`)
}