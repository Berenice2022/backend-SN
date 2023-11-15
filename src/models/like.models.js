import mongoose from 'mongoose';

const likesSchema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    creationdate: {
      type: Date,
      default: Date.now,
    },
    updatedate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Likes', likesSchema);
