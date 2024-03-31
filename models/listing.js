const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
     image: {
        filename:{
            type: String,
            // required: true,
        },
        url: {
            type:String,
            // required: true,
        }
     },
    description: String,
    price: Number,
    location: String,
    country: String,
    review:[ {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    // category:{
    //     type:String,
    //     enum:["mountains", "swimming", "amazing views", "trending", "fun",]
    // }
})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;




