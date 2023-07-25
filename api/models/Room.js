import {Schema,model} from "mongoose";

const RoomSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    roomNumbers:[{
            number:Number,
            unavailableDates:{type:[Date]}
    
    }]
    
},
{timestamps:true}
)

export default model("Room",RoomSchema)


