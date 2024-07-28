export type TFaculty = {
  id: string;
  name: string;
  designation: string;
  gender: 'Male' | 'Female' | 'other';
  dateofbirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
};
