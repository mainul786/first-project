import { TCourse } from './course.insterface';
import { course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await course.create(payload);
  return result;
};

const getAllCouserFromDB = async () => {
  const result = await course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await course.findById(id);
  return result;
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
  deleteCourseFromDB,
};
