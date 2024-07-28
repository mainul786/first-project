import { model, Schema } from 'mongoose';
import { TAdmin, TUserName } from './admin.interface';

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const AdminSchema = new Schema<TAdmin>({
  id: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  name: { type: UserNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String },
  isDeleted: { type: Boolean, required: true },
});

export const Admin = model<TAdmin>('admin', AdminSchema);
