const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    metaTitle: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

   
    featureImage: {
      type: String,
    },

    tags: [String],

    categories: [String],

    faq: [
      {
        question: String,
        answer: String,
      },
    ],

    internalLinks: [String],

    externalLinks: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);