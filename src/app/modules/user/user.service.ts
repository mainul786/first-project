import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.modal';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.util';

const createStudentToDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is notgiven, use Default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'student';

  //Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generatedStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id; //embeding
    payload.user = newUser._id; //refarencing
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserServices = {
  createStudentToDB,
};
