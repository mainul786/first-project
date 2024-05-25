import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Z][a-z]*$/),
  middleName: Joi.string().regex(/^[a-zA-Z]+$/),
  lastName: Joi.string().required(),
});

const gurdianNameValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContctNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGurdianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'other').required(),
  dateofbirth: Joi.string().allow(''),
  email: Joi.string().required().email(),
  contactNo: Joi.string().required(),
  emargencyContactNo: Joi.string().allow(''),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow(''),
  presentAddress: Joi.string().allow(''),
  permenantAddress: Joi.string().allow(''),
  gurdianName: gurdianNameValidationSchema,
  localGurdian: localGurdianValidationSchema,
  isProfile: Joi.string().required(),
  active: Joi.string().valid('active', 'blocked').default('active').required(),
  isDeleted:Joi.boolean(),
});

// enum ar poroborte valid babohar korahoy joy library khetre

export default studentValidationSchema;
