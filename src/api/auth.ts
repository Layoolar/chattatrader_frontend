import type { User } from '../context/types';
import instance from './client';

type LoginRequest = {
  email: string;
  password: string;
  captchaToken?: string; // Optional for backward compatibility
};

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  captchaToken?: string; // Optional for backward compatibility
};

type RequestCodeRequest = {
  email: string;
};

type VerifyCodeRequest = {
  code: string;
  email: string;
};

type ExportPrivateKeysRequest = {
  userId: string;
  password: string;
};

type ExportPrivateKeysResponse = {
  ethPrivateKey: string;
  solPrivateKey: string;
};

export const login = async (
  data: LoginRequest
): Promise<{
  userWithoutPassword: Partial<User>;
}> => {
  return instance
    .post<{
      userWithoutPassword: Partial<User>;
    }>('/users/login', data)
    .then((res) => res.data);
};

export const register = async (
  data: RegisterRequest
): Promise<{
  userWithoutPassword: Partial<User>;
}> => {
  return instance
    .post<{
      userWithoutPassword: Partial<User>;
    }>('/users/register', data)
    .then((res) => res.data);
};

export const requestCode = async (data: RequestCodeRequest): Promise<void> => {
  await instance.post('/verification/requestcode', data);
};

export const verifyCode = async (data: VerifyCodeRequest): Promise<void> => {
  await instance.post('/verification/verifycode', data);
};

export const getUserWithToken = async (): Promise<{
  userWithoutPassword: Partial<User>;
}> => {
  return instance
    .get<{
      userWithoutPassword: Partial<User>;
    }>('users/getuserwithtoken')
    .then((res) => res.data);
};

export const logout = async (): Promise<void> => {
  await instance.post('/users/logout');
};

export const exportPrivateKeys = async (
  data: ExportPrivateKeysRequest
): Promise<ExportPrivateKeysResponse> => {
  return instance
    .post<ExportPrivateKeysResponse>('users/exportprivatekeys', data)
    .then((res) => res.data);
};
