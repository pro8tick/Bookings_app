import {Schema,model} from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
   
    isadmin:{
        type:Boolean,
        default:false
    },
    city:{
        type:String,
        required:true,
    },
    img:{
        type:String
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    
    
},
{timestamps:true}

)

export default model("User",UserSchema)


