import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['lost', 'found','claim'],
      lowercase: true,
    },

    itemTitle: {
      type: String,
      required: true,
      minlength: 3
    },

    dateFound: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    location: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    image: {
      type: String,
      required: true 
    },

    find:{
      type:Boolean,
      default:false
    },

    reportedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;