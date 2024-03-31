const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js");

mongourl =  "mongodb://127.0.0.1:27017/wanderlist"
async function main(){
    await mongoose.connect(mongourl);
}
main()
.then(()=>{
    console.log("DB is connected");
})
.catch((err)=>{
    console.log(err)
})


const initDB = async ()=>{
   await Listing.deleteMany({})
   initData.data = initData.data.map((obj)=>({...obj, owner:'65f90bc7c2cfc9207269c67e'}))
   await Listing.insertMany(initData.data)
   console.log("data initialized")
} 
initDB();
