import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getStudentsDataFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const result = await Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDeaptment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleDataFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  // use aggregate
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardianName, localGuardian, ...remaningStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardianName && Object.keys(guardianName).length) {
    for (const [key, value] of Object.entries(guardianName)) {
      modifiedUpdatedData[`guardianName.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deletedDataFromDb = async (id: string) => {
  // Trasaction and roll back start
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      return new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      return new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const StudentServices = {
  getStudentsDataFromDB,
  getSingleDataFromDb,
  updateStudentIntoDB,
  deletedDataFromDb,
};
