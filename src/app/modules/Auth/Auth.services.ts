import { TLoginUser } from './Auth.interface';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
};

export const AuthServices = {
  loginUser,
};
