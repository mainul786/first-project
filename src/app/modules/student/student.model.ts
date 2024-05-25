import { Schema, model } from 'mongoose';
import {
  TGuradian,
  TLocalGurdian,
  TStudent,
  // StudentMethods,// for instance methods
  StudentModel,
  TUsername,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';

const saltRounds = 12


const userNameSchema = new Schema<TUsername>({
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

const gurdianNameSchema = new Schema<TGuradian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContctNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

//instance methods
// const studentSchema = new Schema<TStudent,  StudentModel, StudentMethods>({

//static methods
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
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
  isDeleted:{
   type: Boolean,
  default:false
  }
},{
  toJSON:{
    virtuals:true,
  }
});


// virtual

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// Query Middleware

studentSchema.pre('find', function(next){
this.find({isDeleted:{$ne:true}})
  next()
})
studentSchema.pre('findOne', function(next){
this.find({isDeleted:{$ne:true}})
  next()
})




//aggregation 
studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne: true}}})
    next()
  })
  

//document middleware
studentSchema.pre('save', async function(next){
  // console.log(this, `pre show data before set database`)
  const user = this.password;
 this.password = await bcrypt.hash(user, Number(saltRounds))
 next()
})

studentSchema.post('save', function(doc, next){
  doc.password = '';
  // console.log(doc, `post data show data after set database`)
  next()
})

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
