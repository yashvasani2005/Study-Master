const Category=require("../models/Category")

//create the  category
exports.createcategory=async(req,res)=>{
   try{
    const {name,description}=req.body;

    if(!name || !description){
        return res.status(401).json({
            success:false,
            message:"All Fields Are required"
        })
    }

    const categorydetails=await Category.create({name:name},{description:description})
  console.log(categorydetails)
    return res.status(200).json({
        success:true,
        message:"category Created Succesfully",
        categorydetails
    })

   }
   catch(err){
    console.log(err)
    return res.status(500).json({
    success:false,
    message:"Error in while creating category, Something went wrong"
    })
   }

    
}

//fetch all the category

exports.fetchallcategory=async(req,res)=>{
    try{
     const allcategory=await Category.find({},{name:true,description:true})
 
     return res.status(200).json({
         success:true,
         message:"Fetch All The category Succesfully",
         allcategory
     })
 
    }
    catch(err){
     console.log(err)
     return res.status(500).json({
     success:false,
     message:"Error in while fetch (find) all category, Something went wrong"
     })
    }
 
     
 }

 exports.categorypagedetails=async(req,res)=>{
    try{
        const{categoryId}=req.body;

        const selectedcategory=await Category.findById(categoryId).populate("courses").exec();

        console.log(selectedcategory)

        if(!selectedcategory){
            console.log("Category Not Found");
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }

        //handle when there are no any courses

        if(selectedcategory.courses.length===0){
            console.log("No course found for the selected category.")
            return res.status(404).json({
                success:false,
                message:"No Course  found for the selected category"
            })
        }

        const selectedcourses=selectedcategory.courses;


        //get course for the category

        const CategoriesExpectSlected= await Category.find(

               {_id:{$ne:categoryId}},
        ).populate("courses");

        let differentCourse=[];

        for(const category of CategoriesExpectSlected){
            differentCourse.push(...category.courses)
        }
        
        //get top-selling course across all category

        const allcategory=await Category.find().populate("courses")
        const allcourses=allcategory.flatMap((category)=>category.courses);

        const mostesellingcourse=allcourses.sort((a,b)=>b.sold- a.sold).slice(0,10)


        return res.status(200).json({
            selectedcourses:selectedcourses,
            differentCourse:differentCourse,
            mostesellingcourse:mostesellingcourse,
        })


    }
    catch(err)
    {
        console.log(err)

        return res.status(500).json({
            success:false,
            message:"Error while find thr categorypagedetails "
        })
    }
 }

 