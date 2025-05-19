import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register, login as loginApi } from '../../api/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../reuseables/tabs';
import { Card, CardContent } from '../../reuseables/Card';
import { Label } from '../../reuseables/label';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../reuseables/input';
import { Button } from '../../reuseables/button';
import toast from 'react-hot-toast';

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const NewLogin: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleApiError = (err: unknown, fallback: string) => {
    const message =
      typeof err === 'object' &&
      err &&
      'response' in err &&
      err.response &&
      typeof err.response === 'object' &&
      'data' in err.response &&
      err.response.data &&
      typeof err.response.data === 'object' &&
      'message' in err.response.data
        ? (err.response.data as { message?: string }).message || fallback
        : fallback;

    toast.error(message);
  };

  const handleLoginSubmit = async (values: LoginFormValues) => {
    try {
      const user = await loginApi(values);
      login(user);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      handleApiError(err, 'Login failed');
    }
  };

  const handleSignupSubmit = async (values: SignupFormValues) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      toast.success('Signup successful! Please login.');
      navigate(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      handleApiError(err, 'Signup failed');
    }
  };

  const PasswordInput = ({
    id,
    name,
    value,
    onChange,
    onBlur,
    show,
    toggle,
    placeholder,
  }: {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    show: boolean;
    toggle: () => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
      />
      <div
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={toggle}
      >
        {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </div>
    </div>
  );

  const LoginForm = () => (
    <Formik<LoginFormValues>
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLoginSubmit}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <Button type="submit" className="w-full bg-[#008080]" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  );

  const SignupForm = () => (
    <Formik<SignupFormValues>
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignupSubmit}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showSignupPassword}
              toggle={() => setShowSignupPassword(!showSignupPassword)}
              placeholder="Create a password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm your password"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>

          <Button type="submit" className="w-full bg-[#008080]" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center px-6 py-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-[#008080]">
              Chatta<span className="text-orange-400">Trader</span>
            </h1>
          </div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-sm text-center text-gray-600 mb-6">Please enter your details</p>
              <Tabs defaultValue={selectedTab} onValueChange={(val) => setSelectedTab(val as 'login' | 'signup')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img className="h-full w-full object-cover" src="/images/chatbot.png" alt="ChattaTrader background" />
      </div>
    </div>
  );
};

export default NewLogin;
