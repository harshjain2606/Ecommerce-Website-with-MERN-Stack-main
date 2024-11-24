const mongoose = require('mongoose')

const productSchemas =new mongoose.Schema({
    name : {
        type: String,
        required : [true , "Please enter product name"],
        trim : true ,
        maxLength:[100,"Product name cannot exceed 100 characters"]
    },
    price: {
        type : Number,
        required : true,
        default : 0.0
    },
    description:{
        type:String,
        required:[true , "Please enter product description"],
    },
    rating:{
        type:Number,
        default:0
    },
    images: [
        {
            image:{
                type:String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum:{
            values:[
                'Sarees',
                'Wooden Temple',
                'Shoe',
                'T-shirt',
                'Shirt',
                'Pant',
                'Watch'
            ],
            message: "Please select coorect catogory"

        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock:{
        type: Number,
        required : [true , "Please enter product name"],
        maxLength:[20,"Product name cannot exceed 100 characters"]
    },
    numberOfReviews: {
        type: Number,
        default:0
    },
    reviews:[{
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type : mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

const schema= mongoose.model('Product',productSchemas)

module.exports=schema