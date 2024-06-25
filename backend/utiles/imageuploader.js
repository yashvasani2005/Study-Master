// const cloudinary=require("cloudinary")

// exports.imageuploader=async(file,folder,height,qaulity)=>{

//     const options={folder}

//     if(height){
//         options.height=height;
//     }
//     if(qaulity){
//         options.qaulity=qaulity;
//     }
//     options.resource_type="auto"

//     return await cloudinary.uploader.upload(file.tempFilePath,options)


// }
const cloudinary = require("cloudinary").v2;

exports.imageuploader = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"; // Ensure this is set to handle both images and videos

    try {
        console.log("Uploading file to Cloudinary:", file);
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Upload successful:", result);
        return result;
    } catch (error) {
        console.error("Upload Error:", error);
        throw error;
    }
};
