import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudenttoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentService = async (req: Request, res: Response) => {
  const result = await StudentServices.getStudentsDataFromDB();
  res.status(200).json({
    status: true,
    message: 'Students Data Getting Succefully',
    data: result,
  });
};

const getSingleServices = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleDataFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Getting single Data successfully!',
    data: result,
  });
};

export const StudentControllers = {
  createStudent,
  getStudentService,
  getSingleServices,
};
