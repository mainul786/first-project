import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getStudentsDataFromDB = async () => {
  const result = await Student.find()
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
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getStudentsDataFromDB,
  getSingleDataFromDb,
  deletedDataFromDb,
};
