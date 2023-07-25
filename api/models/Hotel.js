import {Schema,model} from "mongoose";

const HotelSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        
    },
    desc:{
        type:String,
        require:true
    },
    distance:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String],
        
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    
})

export default model("Hotel",HotelSchema)


