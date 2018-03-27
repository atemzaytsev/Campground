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
    image:String,
    description:String
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
            res.render("index",{campgrounds:allCampgrounds})
            }
        });
    });
    // res.render("campgrounds",{campgrounds:campgrounds})

app.post("/campgrounds",function(req,res){
    //get data from form and add to the campgrounds array
   var name= req.body.name;
   var image =req.body.image;
   var desc =req.body.description;
   var newCampground = {name: name, image: image,description:desc};
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
//SHOW - shows more info about campground
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template
            res.render("show",{campground:foundCampground});
        }
    })
})
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("the yelpcamp server has started");
});

