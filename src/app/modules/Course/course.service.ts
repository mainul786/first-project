import mongoose from 'mongoose';
import QueryBulders from '../../bulders/QueryBulders';
import { courseSearchAbleField } from './course.constant';
import { TCourse, TCoursefaculty } from './course.insterface';
import { Course, CourseFaculty } from './course.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
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
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remaningCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourse = await Course.findByIdAndUpdate(
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

      const deletedpreRequisiteCourses = await Course.findByIdAndUpdate(
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

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
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

    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );

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
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseServices = {
  createCourseIntoDB,
  getAllCouserFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
