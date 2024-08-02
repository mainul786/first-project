import { model, Schema, Types } from 'mongoose';
import {
  TCourse,
  TCoursefaculty,
  TPreRequisiteCourse,
} from './course.insterface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const course = model<TCourse>('Course', courseSchema);

const coureseFacultySchema = new Schema<TCoursefaculty>({
  course: {
    types: Schema.Types.ObjectId,
    ref: 'course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCoursefaculty>(
  'CourseFaculty',
  coureseFacultySchema,
);
