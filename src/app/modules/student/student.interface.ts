import { Schema, model, connect } from 'mongoose';

export type Guradian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContctNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type Username = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: Username;
  gender: 'Male' | 'Female' | 'other';
  dateofbirth: string;
  email: string;
  contactNo: string;
  emargencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permenantAddress: string;
  gurdianName: Guradian;
  localGurdian: LocalGurdian;
  isProfile?: String;
  active: 'active' | 'blocked';
};
