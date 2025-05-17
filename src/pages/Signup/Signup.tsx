import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { register } from '../../api/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import FormInput from '@/components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password Required'),
});

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-poppins">
      {/* Header */}
      <header className="bg-white shadow-[0_4px_16px_0_#00000026] py-4 flex justify-center mb-1">
        <h1 className="text-[20px] font-[900] tracking-wide text-[#0487E2] md:h-[30px]">ChatterTrader</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden md:h-[640px] md:gap-0">
        {/* Left Image */}
        <div className="md:w-1/2 w-full h-48 md:h-full flex-shrink-0">
          <img
            src="/images/leftImage.svg"
            alt="Signup Visual"
            className="object-cover object-left w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full flex items-center justify-start px-6 py-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-full max-w-md">
              <h2 className="text-[#324054] text-[24px] md:text-[32px] font-semibold mb-6">Sign up Now</h2>

              <FormInput name="username" label="Username" type="text" />
              <FormInput name="email" label="Email" type="email" />

              {/* Password */}
              <div className="relative mb-4">
                <FormInput
                  name="password"
                  label="Enter your Password"
                  type={showPassword ? 'text' : 'password'}
                />
                <div
                  className="absolute right-3 top-[52px] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative mb-4">
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                />
                <div
                  className="absolute right-3 top-[52px] cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Terms & Marketing */}
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <img src="/images/check.svg" alt="Check Icon" className="w-4 h-4 mt-1" />
                  <p className="text-[14px] font-[700] font-poppins text-[#32405499]">
                    By Creating an account, I agree to our{' '}
                    <a href="#" className="text-[#0463CA]">Terms of use</a> and policy
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <img src="/images/check.svg" alt="Check Icon" className="w-4 h-4 mt-1" />
                  <p className="text-[14px] font-[700] font-poppins text-[#32405499] leading-tight">
                    By creating an account, I am also consenting to receive SMS messages and Emails including web3 News update and Marketing Promotions.
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-4">
                <button
                  type="submit"
                  className="bg-[#BBCACA] rounded-[24px] w-full md:w-[158px] md:h-[59px] py-3 text-[#324054] font-[500] text-[18px] cursor-pointer font-poppins"
                >
                  Sign Up
                </button>
                <p className="text-[#32405499] text-[14px] md:text-[16px] font-[500] text-center md:text-left">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#0463CA]">Login</Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;