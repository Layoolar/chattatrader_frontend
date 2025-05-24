import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register, login as loginApi } from '../../api/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Tabs, TabsList, TabsTrigger } from '../../reuseables/tabs';
import { Label } from '../../reuseables/label';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../reuseables/input';
import { Button } from '../../reuseables/button';
import toast from 'react-hot-toast';

const signupValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email:    Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6,'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')],'Passwords must match')
    .required('Confirm password is required'),
});
const loginValidationSchema = Yup.object({
  email:    Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function NewLogin() {
  const [selectedTab, setSelectedTab] = useState<'login'|'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate   = useNavigate();

  const handleApiError = (err: any, fallback: string) => {
    const msg = err?.response?.data?.message ?? fallback;
    toast.error(msg);
  };

  const handleLoginSubmit = async (vals: any) => {
    try {
      const user = await loginApi(vals);
      login(user);
      toast.success('Login successful!');
      navigate('/');
    } catch (e) {
      handleApiError(e, 'Login failed');
    }
  };
  const handleSignupSubmit = async (vals: any) => {
    try {
      await register(vals);
      toast.success('Signup successful! Please login.');
      navigate(`/verify-otp?email=${encodeURIComponent(vals.email)}`);
    } catch (e) {
      handleApiError(e, 'Signup failed');
    }
  };

  const PasswordInput = ({ id,name,value,onChange,onBlur,show,toggle,placeholder }: any) => (
    <div className="relative">
      <input
        id={id} name={name} type={show?'text':'password'}
        placeholder={placeholder}
        value={value} onChange={onChange} onBlur={onBlur}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
      />
      <div
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={toggle}
      >
        {show ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
      </div>
    </div>
  );

  const LoginForm = () => (
    <Formik
      initialValues={{email:'',password:''}}
      validationSchema={loginValidationSchema}
      onSubmit={handleLoginSubmit}
    >
      {({ values, handleChange, handleBlur, isSubmitting })=>(
        <Form className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-left mb-1">Email</Label>
            <Input
              id="email" name="email" type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange} onBlur={handleBlur}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <div>
            <Label htmlFor="password" className="block text-left mb-1">Password</Label>
            <PasswordInput
              id="password" name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showPassword}
              toggle={()=>setShowPassword(!showPassword)}
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-[#008080] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in…':'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  );

  const SignupForm = () => (
    <Formik
      initialValues={{username:'',email:'',password:'',confirmPassword:''}}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignupSubmit}
    >
      {({ values, handleChange, handleBlur, isSubmitting })=>(
        <Form className="space-y-4">
          <div>
            <Label htmlFor="username" className="block text-left mb-1">Username</Label>
            <Input
              id="username" name="username" type="text"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange} onBlur={handleBlur}
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <div>
            <Label htmlFor="email" className="block text-left mb-1">Email</Label>
            <Input
              id="email" name="email" type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange} onBlur={handleBlur}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <div>
            <Label htmlFor="password" className="block text-left mb-1">Password</Label>
            <PasswordInput
              id="password" name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showSignupPassword}
              toggle={()=>setShowSignupPassword(!showSignupPassword)}
              placeholder="Create a password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-left mb-1">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword" name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              show={showConfirmPassword}
              toggle={()=>setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm your password"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1"/>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-[#008080] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up…':'Sign Up'}
          </Button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300"/>
            <span className="px-2 text-sm text-gray-500">or continue with</span>
            <hr className="flex-grow border-gray-300"/>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <img src="/images/frames.svg" alt="Google" className="w-5 h-5 mr-2"/>
            Sign up with Google
          </button>

         <p 
          className="text-sm sm:text-base text-[#7B7B7B] 
          font-normal text-center sm:text-left mt-4
           leading-relaxed px-4 sm:px-0">
           By pressing Continue, you agree to Fantasy{' '}
           <a href="#" className="text-[#4C3BCF] underline">Terms of Service</a>{' '}
           and{' '}
           <a href="#" className="text-[#4C3BCF] underline">Privacy Policy</a>.
         </p>
        </Form>
      )}
    </Formik>
  );

  return (
  <div className="flex flex-col md:flex-row w-full min-h-screen">
  <div className="w-full md:w-1/2 bg-gray-100 flex flex-col px-6 py-8">
    <div className="max-w-md mx-auto">
      <h1 className="text-[25px] text-center mt-[40px] font-bold text-[#008080] mb-4 font-poppins">
        Chatta<span className="text-orange-400">Trader</span>
      </h1>
      <h2 className="text-[25px] font-bold text-center mt-[40px] text-gray-900 mb-2 font-poppins">Welcome Back</h2>
      <p className="text-sm text-gray-600 mb-6 text-center font-poppins">Welcome Back, Please enter your details</p>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 mb-4 bg-[#E9E9E9]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div className="px-6 pb-10">
      <div className="max-w-[324px] mx-auto">
        {selectedTab === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  </div>

  <div className="hidden md:flex md:w-1/2 h-full">
    <img
      src="/images/chatbot.png"
      alt="Chatbot"
      className="w-full h-full object-cover"
    />
  </div>
</div>
);
}
