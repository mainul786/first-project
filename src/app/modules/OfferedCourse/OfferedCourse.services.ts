import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
};
