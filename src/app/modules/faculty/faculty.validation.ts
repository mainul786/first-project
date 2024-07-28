import { z } from 'zod';

const createFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    name: z.string(),
    designation: z.string(),
    gender: z.enum(['Male', 'Female', 'Other']),
    dateofbirth: z.string(), // Or z.date() if you prefer to use Date type
    email: z.string().email('Please enter a valid email address.'),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string().optional(), // This field is not required
    isDeleted: z.boolean().default(false),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    designation: z.string().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    dateofbirth: z.string().optional(),
    email: z.string().email('Please enter a valid email address.').optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const facultyValidationSchema = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
