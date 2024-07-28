import { z } from 'zod';

const CreateUserNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

const CreateAdminSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required'),
    designation: z.string().min(1, 'Designation is required'),
    name: CreateUserNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Invalid email address'),
    contactNo: z.string().min(10, 'Contact number is required'),
    emergencyContactNo: z
      .string()
      .min(10, 'Emergency contact number is required'),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O+'])
      .optional(),
    presentAddress: z.string().min(1, 'Present address is required'),
    permanentAddress: z.string().min(1, 'Permanent address is required'),
    profileImg: z.string().optional(),
    isDeleted: z.boolean(),
  }),
});

const UpdateUserNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

const UpdateAdminSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required'),
    designation: z.string().min(1, 'Designation is required'),
    name: UpdateUserNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Invalid email address'),
    contactNo: z.string().min(10, 'Contact number is required'),
    emergencyContactNo: z
      .string()
      .min(10, 'Emergency contact number is required'),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O+'])
      .optional(),
    presentAddress: z.string().min(1, 'Present address is required'),
    permanentAddress: z.string().min(1, 'Permanent address is required'),
    profileImg: z.string().optional(),
    isDeleted: z.boolean(),
  }),
});

export const AdminValidation = { CreateAdminSchema, UpdateAdminSchema };
