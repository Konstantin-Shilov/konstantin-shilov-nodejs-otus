const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: false,
      trim: true,
      maxlength: [100, 'Name can not be more than 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description can not be more than 50 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      require: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LessonSchema.pre('remove', async function(next) {
  next();
});

LessonSchema.pre('save', function(next) {
  next();
});

module.exports = mongoose.model('Lesson', LessonSchema);
