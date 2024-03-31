const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const ExpressError = require("./utils/expressError.js");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname,"/public")));




atlasurl =  process.env.ATLASDB_URL
async function main(){
    await mongoose.connect(atlasurl);
}
main()
.then((req,res)=>{
    console.log("DB is connected");
})
.catch((err)=>{
    console.log(err)
})

const store = MongoStore.create({
    mongoUrl: atlasurl,
    crypto: {
        secret: process.env.SECRET, 
      },
      touchAfter: 24*3600,
})

store.on("error", ()=>{
    console.log("error is mongo session store", err)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 7*24*60*60*1000 ,
        maxAge:7*24*60*60*1000 ,
        httpOnly: true,
    }
}



 //session & flash 
app.use(session(sessionOptions))
app.use(flash());

//passport 
app.use(passport.initialize());                                 
app.use(passport.session());                                   
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//locals 
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currUser= req.user;
    next();
})

app.get("/demouser" , async(req,res)=>{
    let fakeUser = new User ({
        email: "robert@gmail.com",
        username: "robertbaratheon" ,
    })
   let registeredUser = await  User.register(fakeUser, "helloUniverse");
   res.send(registeredUser);
})

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews" , reviewsRouter);
app.use("/" , userRouter)

app.all("*" , (req,res,next) =>{
    next(new ExpressError(404, "page not found!"))

})
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Internal Server Error" } = err;
    res.status(statusCode).render("error.ejs", { err });
})
app.listen(8080, ()=>{
    console.log(" server is listening at 8080")
 }) 

