import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,// for instance methods
  StudentModel,
  TUsername,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value: String) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
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

const guardianNameSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

//instance methods
// const studentSchema = new Schema<TStudent,  StudentModel, StudentMethods>({

//static methods
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: 'User',
    },
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
    guardianName: {
      type: guardianNameSchema,
    },
    localGuardian: {
      type: localGuardianSchema,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'semester',
    },
    isProfile: { type: String, required: true },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    academicDeaptment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Query Middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//aggregation
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// instance method schema method call
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
