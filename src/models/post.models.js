import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    creationdate: {
      type: Date,
      default: Date.now,
    },
    updatedate: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Posts', postsSchema);
