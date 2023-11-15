import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim: true //'  juan  '= 'juan' delete space
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    type: {
        type:Number,
        default:1
    },
},
{
    timestamps:true //to meet when it was created 
});

export default mongoose.model('User',userSchema);