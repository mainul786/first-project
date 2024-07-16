import { z } from 'zod';
const CreateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});
const UpdateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});

export const academicFacultyValidation = {
  CreateAcademicFacultyValidation,
  UpdateAcademicFacultyValidation,
};
