import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRouter } from '../modules/faculty/faculty.route';
import { adminRoute } from '../modules/Admin/admin.route';
import { courseRouter } from '../modules/Course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoute,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/course',
    route: courseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
