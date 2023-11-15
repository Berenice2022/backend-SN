import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photography: {
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

export default mongoose.model('Events', eventsSchema);
