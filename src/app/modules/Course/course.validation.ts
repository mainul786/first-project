import { z } from 'zod';
const createPreRequisiteCourseValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(createPreRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourse: z.array(createPreRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidation = {
  createCourseValidation,
  updateCourseValidation,
  facultiesWithCourseValidationSchema,
};
