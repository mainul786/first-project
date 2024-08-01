import mongoose from 'mongoose';
import QueryBulders from '../../bulders/QueryBulders';
import { courseSearchAbleField } from './course.constant';
import { TCourse } from './course.insterface';
import { course } from './course.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await course.create(payload);
  return result;
};

const getAllCouserFromDB = async (query: Record<string, unknown>) => {
  // const courseQuery = new QueryBulders(
  //   course.find().populate('preRequisiteCourse.course'),
  //   query,
  // )
  //   .search(courseSearchAbleField)
  //   .filter()
  //   .sort()
  //   .peginate()
  //   .fieldFilter();

  // const result = await courseQuery.modelQuery;
  const result = await course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await course
    .findById(id)
    .populate('preRequisiteCourse.course');
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remaningCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourse = await course.findByIdAndUpdate(
      id,
      remaningCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // FilterOut the Deleted filed
      const deletedpreRequisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedpreRequisiteCourses = await course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedpreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedpreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
      }
      const newPreRequisite = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
      }
    }

    const result = await course
      .findById(id)
      .populate('preRequisiteCourse.course');

    return result;

    await session.commitTransaction();
    await session.endSession();
  } catch (ere) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faield to Updated');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCouserFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
