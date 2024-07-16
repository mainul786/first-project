import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCode } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';

const createAcademicSemesterToDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Name and Semester code does not match.',
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCode[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterToDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
