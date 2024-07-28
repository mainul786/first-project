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
    preRequisiteCourse: z.array(createPreRequisiteCourseValidation),
  }),
});

export const courseValidation = {
  createCourseValidation,
};