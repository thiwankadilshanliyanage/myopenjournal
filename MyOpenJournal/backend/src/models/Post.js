import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 320
    },
    content: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      default: ''
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true
    }
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

export default mongoose.model('Post', postSchema);
