import type { User } from '../context/types';
import instance from './client';

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

type RequestCodeRequest = {
  email: string;
};

type VerifyCodeRequest = {
  code: string;
  email: string;
}

export const login = async (data: LoginRequest): Promise<Partial<User>> => {
  return instance
    .post<Partial<User>>('/users/login', data)
    .then((res) => res.data);
};

export const register = async (
  data: RegisterRequest
): Promise<Partial<User>> => {
  return instance.post<User>('/users/register', data).then((res) => res.data);
};


export const requestCode = async (data: RequestCodeRequest): Promise<void> => {
   await instance.post('/verification/requestcode', data);
}

export const verifyCode = async (data: VerifyCodeRequest): Promise<void> => {
  await instance.post('/verification/verifycode', data);
};