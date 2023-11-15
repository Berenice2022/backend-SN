import mongoose from "mongoose";

const infoProfilesSchema = new mongoose.Schema(
    {
    fullname:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        default:Date.now
    },
    gender:{
        type:String,
        required:true
    },
    civil_status:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },
    description_personal:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }
},{
        timestamps: true
    }
);

export default mongoose.model('InfoProfiles',infoProfilesSchema);