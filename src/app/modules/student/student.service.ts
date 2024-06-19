import { TStudent } from './student.interface';
import { Student } from './student.model';

const getStudentsDataFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleDataFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });

  // use aggregate
  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

const deletedDataFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentsDataFromDB,
  getSingleDataFromDb,
  deletedDataFromDb,
};
