import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdminIntoDb = async (payload: TAdmin) => {
  const result = await Admin.create(payload);
  return result;
};

const getAllAdminIntoDb = async () => {
  const result = await Admin.find({});
  return result;
};

const getSingleAdminIntoDb = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

export const AdminServices = {
  createAdminIntoDb,
  getAllAdminIntoDb,
  getSingleAdminIntoDb,
};
