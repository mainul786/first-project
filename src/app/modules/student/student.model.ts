import { Schema, model, connect } from 'mongoose';
import { Guradian, LocalGurdian, Student, Username } from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const gurdianNameSchema = new Schema<Guradian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContctNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: ['Male', 'Female'],
  dateofbirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emargencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String },
  permenantAddress: { type: String },
  gurdianName: gurdianNameSchema,
  localGurdian: localGurdianSchema,
  isProfile: { type: String, required: true },
  active: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
