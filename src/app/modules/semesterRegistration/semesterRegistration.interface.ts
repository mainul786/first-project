import { Types } from 'mongoose';
export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMMING' | 'ONGOING' | 'END';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
