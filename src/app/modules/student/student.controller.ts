import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validationJoyLibrary';
// import studentValidationSchema from './student.validationZod';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // joi validation through data pass
    const { error, value } = studentValidationSchema.validate(studentData);

    // zod validation
    // const zodData = studentValidationSchema.parse(studentData);
    // console.log(zodData);
    const result = await StudentServices.createStudenttoDB(value);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'something went is wrong',
      error: err,
    });
  }
};

const getStudentService = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsDataFromDB();
    res.status(200).json({
      status: true,
      message: 'Students Data Getting Succefully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'something went is wrong',
      error: err,
    });
  }
};

const getSingleServices = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleDataFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Getting single Data successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'something went is wrong',
      error: err,
    });
  }
};

const deletedSingleService = async (req:Request, res:Response) =>{
  try{
    const {studentId} = req.params;
    console.log(studentId)
    const result = await StudentServices.deletedDataFromDb(studentId)
    res.status(200).json({
      status:true,
      message:'Student data deleted succefully',
      data:result
    })
  }catch(err:any){
res.status(500).json({
  status:false,
  message:err.message || 'student data can`t delete beacuse something went is wrong!',
  error:err,
})
  }
}

export const StudentControllers = {
  createStudent,
  getStudentService,
  getSingleServices,
  deletedSingleService,
};
