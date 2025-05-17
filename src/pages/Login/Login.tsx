import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { login } from '../../api/auth';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is Required'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const user = await login(values);
      setUser(user);
      toast.success('Login successful!');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-poppins">
      {/* Header */}
      <header className="bg-white shadow-[0_4px_16px_0_#00000026] py-4 flex justify-center mb-1">
        <h1 className="text-[20px] font-[900] tracking-wide text-[#0487E2] md:h-[30px]">ChatterTrader</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden md:h-[640px]">
        {/* Left Image */}
        <div className="md:w-1/2 w-full h-48 md:h-full">
          <img
            src="/images/signinImag.svg"
            alt="SignIn Visual"
            className="object-cover md:object-contain object-left w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full flex items-start justify-start px-6 py-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-full max-w-md">
              <h2 className="text-[#324054] text-[24px] font-semibold md:text-[32px] mb-6">Hello Welcome Back</h2>

              <FormInput name="email" label="Email" type="email" />

              {/* Password */}
              <div className="relative mb-4">
                <FormInput
                  name="password"
                  label="Enter your password"
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
                <div className="flex justify-end">
                  <Link to="/">
                    <span className="text-[#324054] font-[500] font-poppins text-[20px]">Forgot Password?</span>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center mt-4 text-[#FFFFFF] font-[500] font-poppins text-[16px] md:text-[24px]">
                <button
                  type="submit"
                  className="bg-[#0463CA] w-full h-[52px] md:w-[494px] md:h-[64px] cursor-pointer"
                >
                  Login
                </button>
              </div>
              <span className="flex justify-center items-center mt-4 gap-2 text-[#32405499] text-[16px] md:text-[20px] font-[500] font-poppins">
                Don't have an account yet?
                <Link to="/signup" className="text-[#0463CA]">Sign up</Link>
              </span>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;