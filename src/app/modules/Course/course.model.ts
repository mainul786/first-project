import { model, Schema, Types } from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.insterface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: { type: Boolean, default: true },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourse: [preRequisiteCourseSchema],
});

export const course = model<TCourse>('Course', courseSchema);
