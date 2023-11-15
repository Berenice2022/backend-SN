import mongoose from 'mongoose';

const interestsSchema = new mongoose.Schema(
  {
    interest_category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    importance: {
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

export default mongoose.model('Interests', interestsSchema);
