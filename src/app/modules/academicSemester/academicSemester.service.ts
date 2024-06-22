import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';

const createAcademicSemesterToDb = async (academicData: TAcademicSemester) => {
  const result = await AcademicSemester.create(academicData);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterToDb,
};
