import mongoose from 'mongoose';

const syllabusItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  videoUrl: { type: String },
  isFree: { type: Boolean, default: false }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    default: 'ر.س',
  },
  category: {
    type: String,
    required: true, // e.g. 'القدرات', 'التحصيلي'
  },
  subCategory: {
    type: String, // e.g. 'الكمي', 'اللفظي'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  rating: {
    type: Number,
    default: 0,
  },
  features: [{
    type: String,
  }],
  syllabus: [syllabusItemSchema],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

export const Course = mongoose.model('Course', courseSchema);