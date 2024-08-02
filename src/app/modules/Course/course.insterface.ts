import { EXPECTATION_FAILED } from 'http-status';
import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse: [TPreRequisiteCourse];
  isDeleted: boolean;
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
