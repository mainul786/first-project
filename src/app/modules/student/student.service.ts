import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudenttoDB = async (studentData: TStudent) => {
  //static method apply
  if (await Student.isUserExists(studentData.id)) {
    throw new Error(`User Already Exists.`);
  }
  const result = await Student.create(studentData);

  //instance method
  // const studentInstance = new Student(studentData); //create an instance
  //instance methods
  // if (await studentInstance.isUserExists(studentData.id)) {
  //   throw new Error(`User Already Exists.`);
  // }
  // const result = await studentInstance.save(); //build-in instance method
  return result;
};

const getStudentsDataFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleDataFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudenttoDB,
  getStudentsDataFromDB,
  getSingleDataFromDb,
};
