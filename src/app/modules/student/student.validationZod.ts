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
  fatherContctNo: z.string(),
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

const studentValidationSchema = z.object({
  id: z.string().min(1),
  name: userNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'other']),
  dateofbirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emargencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permenantAddress: z.string(),
  gurdianName: guardianNameValidationSchema,
  localGurdian: localGuardianValidationSchema,
  isProfile: z.string().min(1).optional(),
  active: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
