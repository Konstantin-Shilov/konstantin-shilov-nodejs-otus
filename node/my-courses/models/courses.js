const mongoose = require('mongoose');

const Reviews = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    required: [true, 'author is required!'],
  },
  text: {
    type: String,
    required: [true, 'Text is required!'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true,
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
    reviews: [Reviews]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CourseSchema.pre('remove', async function(next) {
  await this.model('Lesson').deleteMany({ course: this._id });
  next();
});

CourseSchema.pre('save', function(next) {
  next();
});

CourseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
  justOne: false,
});

module.exports = mongoose.model('Course', CourseSchema);
