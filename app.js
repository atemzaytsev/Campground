var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //get all components from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds})
            }
        });
    });
    // res.render("campgrounds",{campgrounds:campgrounds})

app.post("/campgrounds",function(req,res){
    //get data from form and add to the campgrounds array
   var name= req.body.name;
   var image =req.body.image;
   var newCampground = {name: name, image: image};
   //create new campground and save to DB
   Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       }else{
           //redirect to campground page
           res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("the yelpcamp server has started");
});

