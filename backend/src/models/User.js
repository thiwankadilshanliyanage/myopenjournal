import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    avatar: {
      type: String,
      default: ''
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    secretQuestion1: {
      type: String,
      required: true
    },

    secretAnswer1: {
      type: String,
      required: true
    },

    secretQuestion2: {
      type: String,
      required: true
    },

    secretAnswer2: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  if (this.isModified('secretAnswer1')) {
    this.secretAnswer1 = await bcrypt.hash(this.secretAnswer1, 12);
  }

  if (this.isModified('secretAnswer2')) {
    this.secretAnswer2 = await bcrypt.hash(this.secretAnswer2, 12);
  }

  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.compareSecretAnswer1 = function (candidate) {
  return bcrypt.compare(candidate, this.secretAnswer1);
};

userSchema.methods.compareSecretAnswer2 = function (candidate) {
  return bcrypt.compare(candidate, this.secretAnswer2);
};

export default mongoose.model('User', userSchema);