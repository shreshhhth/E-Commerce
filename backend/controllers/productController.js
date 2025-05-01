import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


//fucntion for adding products
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, bestSeller, sizes } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];//checking if the image is available then store it else nothing
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        //After getting images from input feild, we cannot directly save it into database so we first save them on cloudinary and then get the url to save further in the database
        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)//empty image will not be saved as undefined and saved in images as array

        let imagesUrl = await Promise.all(
            images.map(async(item, index)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })
        )
        //Defining the product data structure
        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller==="true"? true: false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success:true, message:"Product has been added to DataBase"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });


    }
}


//fucntion for listinf products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}


//fucntion for removing products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product Removed"})
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}


//fucntion for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error) {
        res.json({success:false, message:error.message}); 
    }
}

export { addProduct, listProduct, removeProduct, singleProduct };