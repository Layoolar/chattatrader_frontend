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
