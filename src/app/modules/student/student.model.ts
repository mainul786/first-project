import { Schema, model } from 'mongoose';
import { Guradian, LocalGurdian, Student, Username } from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<Username>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value: String) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        console.log(firstNameStr);
        return firstNameStr === value;
      },
      message: `{VALUE} is not in capitalize format`,
    },
  },
  middleName: {
    type: String,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid string type data`,
    },
    required: true,
  },
  lastName: { type: String, required: true },
});

const gurdianNameSchema = new Schema<Guradian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContctNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'other'],
    required: true,
  },
  dateofbirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} is not a valid email type`,
    },
  },
  contactNo: { type: String, required: true },
  emargencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String },
  permenantAddress: { type: String },
  gurdianName: {
    type: gurdianNameSchema,
  },
  localGurdian: {
    type: localGurdianSchema,
  },
  isProfile: { type: String, required: true },
  active: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: `{VALUE} is not valid`,
      default: 'active',
    },
    required: true,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
