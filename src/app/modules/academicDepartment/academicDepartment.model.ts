import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculties',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Deparment Already exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'your provide id is miss match');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
