import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBulders from '../../bulders/queryBulders';
import { searchAbleStudentFields } from './student.constant';

// const searchAbleStudentFields = ['email', 'name.firstName', 'presentAddress'];

const getStudentsDataFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: searchAbleStudentFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // // filtering
  // const exculdeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // exculdeFields.forEach((el) => delete queryObj[el]);
  // console.log({ query }, { queryObj });
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDeaptment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // // sort
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // //limit
  // let limit = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // // pageniation
  // let page = 1;
  // let skip = 0;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const peginateQuery = sortQuery.skip(skip);
  // const limitQuery = peginateQuery.limit(limit);
  // // Field Filtering
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  const studentQuery = new QueryBulders(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDeaptment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchAbleStudentFields)
    .filter()
    .sort()
    .peginate()
    .fieldFilter();

  const result = await studentQuery.modelQuery;
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
