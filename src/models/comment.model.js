import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
    {
    comment:{
        type:String,
        required:true
    },
    post_id:{
        type:String,
        required:true
    },
    creationdate: {
        type: Date,
        default:Date.now
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

export default mongoose.model('Comments',commentsSchema);