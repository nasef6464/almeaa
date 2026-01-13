import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin', 'parent', 'supervisor'],
    default: 'student',
  },
  avatar: {
    type: String,
    default: 'https://i.pravatar.cc/150?img=default',
  },
  // Student Specific Fields (Gamification)
  points: {
    type: Number,
    default: 0,
  },
  badges: [{
    type: String,
  }],
  // Academic Data
  academicStage: {
    type: String, // e.g. high_school
  },
  classNumber: {
    type: String, // e.g. grade_1
  },
  schoolName: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true,
});

export const User = mongoose.model('User', userSchema);