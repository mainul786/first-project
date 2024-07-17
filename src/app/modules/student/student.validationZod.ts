import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const guardianNameValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'other']),
      dateofbirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emargencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permenantAddress: z.string(),
      guardianName: guardianNameValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      isProfile: z.string().min(1).optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
