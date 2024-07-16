import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
