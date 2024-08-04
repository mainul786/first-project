import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.modal';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBulders from './../../bulders/QueryBulders';
import { query } from 'express';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  // if check there any semester regester that is 'UPCOMING' OR 'ONGOING'
  const isThereAnyUpcomingorOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingorOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingorOngoingSemester.status}  semester`,
    );
  }

  //check the semester exists or not

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }
  // check the semester is registration or not
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already register',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  // const semesterRegistrationQuery = new QueryBulders(
  //   SemesterRegistration.find().populate('academicSemester'),
  //   query,
  // )
  //   .filter()
  //   .peginate()
  //   .sort()
  //   .fieldFilter();

  // const result = await semesterRegistrationQuery.modelQuery;
  const result = await SemesterRegistration.find();
  return result;
};

const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistraitonIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //Check if the reqested registered semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Semester is not Registraion please Registration`,
    );
  }

  // if semester is ended we cant not update any data
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === 'END') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't update your ${currentSemesterStatus} semeseter`,
    );
  }

  // we can`t change 'upcoming' to 'end' and 'onging' to 'upcoming', 'end' to 'upcoming and ongoing'

  if (currentSemesterStatus === 'UPCOMING' && requestedStatus === 'END') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't directly change your ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't directly change your ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistration,
  updateSemesterRegistraitonIntoDB,
};
