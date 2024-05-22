import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudenttoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentsDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleDataFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudenttoDB,
  getStudentsDataFromDB,
  getSingleDataFromDb,
};
