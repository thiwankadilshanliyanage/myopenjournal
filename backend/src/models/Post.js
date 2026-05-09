import mongoose from 'mongoose';
import slugify from 'slugify';

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

postSchema.index({
  title: 'text',
  excerpt: 'text',
  content: 'text',
  tags: 'text'
});

postSchema.pre('save', function (next) {

  if (!this.slug) {

    const generatedSlug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: 'ja'
    });

    this.slug =
      generatedSlug ||
      `post-${Date.now()}`;
  }

  next();
});

export default mongoose.model('Post', postSchema);