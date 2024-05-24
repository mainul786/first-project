import { Model } from 'mongoose';

export type TGuradian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContctNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUsername = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUsername;
  gender: 'Male' | 'Female' | 'other';
  dateofbirth: string;
  email: string;
  contactNo: string;
  emargencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permenantAddress: string;
  gurdianName: TGuradian;
  localGurdian: TLocalGurdian;
  isProfile?: String;
  active: 'active' | 'blocked';
};

//apply static methods
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// instance methods
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
