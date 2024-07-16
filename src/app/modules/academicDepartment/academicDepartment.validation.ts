import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Name must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Academic Department must be string',
    }),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Name must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Academic Department must be string',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
