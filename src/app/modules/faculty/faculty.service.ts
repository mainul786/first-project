import { TFaculty } from './faculty.interface';
import { faculty } from './faculty.model';

const createFacultyIntoDb = async (payload: TFaculty) => {
  const result = await faculty.create(payload);
  return result;
};

const getAllFacultyIntoDb = async () => {
  const result = await faculty.find();
  return result;
};

const getSingleFacultyIntoDb = async (id: string) => {
  const result = await faculty.find({ id });
  return result;
};

const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const result = await faculty.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

export const facultyServices = {
  createFacultyIntoDb,
  getAllFacultyIntoDb,
  getSingleFacultyIntoDb,
  updateFacultyIntoDb,
};
