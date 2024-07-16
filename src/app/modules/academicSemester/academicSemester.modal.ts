import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { Schema, model } from 'mongoose';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

// Validation Check already register or not
AcademicSemesterSchema.pre('save', async function (next) {
  const exitsSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (exitsSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester already Exists!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'semester',
  AcademicSemesterSchema,
);
