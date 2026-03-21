import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login as loginApi, register as registerApi } from '../../api/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Tabs, TabsList, TabsTrigger } from '../../reuseables/tabs';
import { Label } from '../../reuseables/label';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../reuseables/input';
import { Button } from '../../reuseables/button';
import { Toaster, toast } from 'react-hot-toast';
import type { FieldProps, FieldInputProps } from 'formik';
import Captcha from '../../components/Captcha';
import type { CaptchaRef } from '../../components/Captcha';
import { RECAPTCHA_SITE_KEY } from '../../lib/recaptcha';

const signupValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  captcha: Yup.string().required('Please complete the CAPTCHA'),
});
const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  captcha: Yup.string().required('Please complete the CAPTCHA'),
});

export default function Signup() {
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const loginCaptchaRef = useRef<CaptchaRef>(null);
  const signupCaptchaRef = useRef<CaptchaRef>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleApiError = (err: unknown, fallback: string) => {
    // Try to extract a message from common error shapes (Axios, fetch, etc)
    let message = fallback;
    if (err && typeof err === 'object') {
      // Axios style: err.response.data.message
      message =
        (err as any)?.response?.data?.message ||
        // Fetch style: err.message
        (err as any)?.message ||
        fallback;
    } else if (typeof err === 'string') {
      message = err;
    }
    toast.error(message);
  };
  const handleLoginSubmit = async (vals: {
    email: string;
    password: string;
    captcha: string;
  }) => {
    try {
      // Verify CAPTCHA token exists
      if (!vals.captcha) {
        toast.error('Please complete the CAPTCHA');
        return;
      }

      const user = await loginApi({
        email: vals.email,
        password: vals.password,
        captchaToken: vals.captcha,
      });
      login(user);
      toast.success('Login successful!');
      navigate('/app/discover');
    } catch (e) {
      handleApiError(e, 'Login failed');
      // Reset CAPTCHA on error
      loginCaptchaRef.current?.reset();
    }
  };
  const handleSignupSubmit = async (vals: {
    username: string;
    email: string;
    password: string;
    captcha: string;
  }) => {
    try {
      // Verify CAPTCHA token exists
      if (!vals.captcha) {
        toast.error('Please complete the CAPTCHA');
        return;
      }

      const { username, email, password } = vals;
      const userData = await registerApi({
        username,
        email,
        password,
        captchaToken: vals.captcha,
      });

      login(userData);
      toast.success('Signup successful!');
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (e: unknown) {
      handleApiError(e, 'Signup failed');
      // Reset CAPTCHA on error
      signupCaptchaRef.current?.reset();
    }
  };

  const PasswordInput = ({
    id,
    field, // <-- from Formik's <Field>
    show,
    toggle,
    placeholder,
  }: {
    id: string;
    field: FieldInputProps<string>;
    show: boolean;
    toggle: () => void;
    placeholder?: string;
  }) => (
    <div className='relative'>
      <input
        {...field}
        id={id}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        required
        autoComplete='new-password'
        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080] text-gray-900'
      />
      <div
        className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500'
        onClick={toggle}
      >
        {show ? (
          <EyeSlashIcon className='w-5 h-5' />
        ) : (
          <EyeIcon className='w-5 h-5' />
        )}
      </div>
    </div>
  );

  const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false); // inside LoginForm now

    return (
      <Formik
        initialValues={{ email: '', password: '', captcha: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <Label htmlFor='email' className='block text-left mb--1'>
                Email
              </Label>
              <Input
                label=''
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email'
              />
            </div>
            <div>
              {' '}
              <Label htmlFor='password' className='block text-left mb-1'>
                Password
              </Label>
              <Field name='password'>
                {({ field }: FieldProps) => (
                  <PasswordInput
                    id='password'
                    field={field}
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                    placeholder='Enter your password'
                  />
                )}
              </Field>{' '}
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>
            {/* CAPTCHA for Login */}
            <div className='flex justify-center'>
              <Field name='captcha'>
                {({ form }: FieldProps) => (
                  <div>
                    <Captcha
                      ref={loginCaptchaRef}
                      siteKey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => {
                        form.setFieldValue('captcha', token || '');
                      }}
                      onError={() => {
                        form.setFieldValue('captcha', '');
                        toast.error('CAPTCHA error. Please try again.');
                      }}
                      onExpired={() => {
                        form.setFieldValue('captcha', '');
                        toast.error('CAPTCHA expired. Please verify again.');
                      }}
                      className='mb-2'
                    />
                    <ErrorMessage
                      name='captcha'
                      component='div'
                      className='text-red-500 text-sm text-center'
                    />
                  </div>
                )}
              </Field>
            </div>

            <Button
              type='submit'
              className='w-full py-2 bg-[#008080] text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in…' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  const SignupForm = () => {
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          captcha: '',
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignupSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <Label htmlFor='username' className='block text-left mb-1'>
                Username
              </Label>
              <Input
                label=''
                id='username'
                name='username'
                type='text'
                placeholder='Enter your username'
              />
            </div>
            <div>
              <Label htmlFor='email' className='block text-left mb-1'>
                Email
              </Label>
              <Input
                label=''
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email'
              />
            </div>
            <div>
              {' '}
              <Label htmlFor='password' className='block text-left mb-1'>
                Password
              </Label>
              <Field name='password'>
                {({ field }: FieldProps) => (
                  <PasswordInput
                    id='password'
                    field={field}
                    show={showSignupPassword}
                    toggle={() => setShowSignupPassword(!showSignupPassword)}
                    placeholder='Create a password'
                  />
                )}
              </Field>
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>
            <div>
              <Label htmlFor='confirmPassword' className='block text-left mb-1'>
                Confirm Password
              </Label>
              <Field name='confirmPassword'>
                {({ field }: FieldProps) => (
                  <PasswordInput
                    id='confirmPassword'
                    field={field}
                    show={showConfirmPassword}
                    toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    placeholder='Confirm your password'
                  />
                )}
              </Field>{' '}
              <ErrorMessage
                name='confirmPassword'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>{' '}
            {/* CAPTCHA for Signup */}
            <div className='flex justify-center'>
              <Field name='captcha'>
                {({ form }: FieldProps) => (
                  <div>
                    <Captcha
                      ref={signupCaptchaRef}
                      siteKey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => {
                        form.setFieldValue('captcha', token || '');
                      }}
                      onError={() => {
                        form.setFieldValue('captcha', '');
                        toast.error('CAPTCHA error. Please try again.');
                      }}
                      onExpired={() => {
                        form.setFieldValue('captcha', '');
                        toast.error('CAPTCHA expired. Please verify again.');
                      }}
                      className='mb-2'
                    />
                    <ErrorMessage
                      name='captcha'
                      component='div'
                      className='text-red-500 text-sm text-center'
                    />
                  </div>
                )}
              </Field>
            </div>
            <Button
              type='submit'
              className='w-full py-2 bg-[#008080] text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up…' : 'Sign Up'}
            </Button>
            <div className='flex items-center my-4'>
              <hr className='flex-grow border-gray-300' />
              <span className='px-2 text-sm text-gray-500'>
                or continue with
              </span>
              <hr className='flex-grow border-gray-300' />
            </div>
            <div className='flex align-middle justify-center'>
              <img src='/images/frames.svg' alt='Google' className='w-7 h-7' />
            </div>
            <p
              className='text-sm sm:text-base text-[#7B7B7B] 
                font-normal text-center sm:text-left mt-4
                leading-relaxed px-4 sm:px-0'
            >
              By pressing Continue, you agree to Fantasy{' '}
              <a href='#' className='text-[#4C3BCF] underline'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='#' className='text-[#4C3BCF] underline'>
                Privacy Policy
              </a>
              .
            </p>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen'>
      <Toaster position='top-center' />
      <div className='w-full md:w-1/2 flex flex-col'>
        <div className='max-w-md mx-auto'>
          <h1 className='text-[25px] text-center font-bold text-[#008080] font-poppins pt-6'>
            Chatta<span className='text-orange-400'>Trader</span>
          </h1>
          <h2 className='text-[25px] font-bold text-center text-gray-900 mb-2 font-poppins pt-10'>
            Welcome Back
          </h2>
          <p className='text-sm text-gray-600 mb-6 text-center font-poppins'>
            Welcome Back, Please enter your details
          </p>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className='grid grid-cols-2 mb-4 bg-[#E9E9E9]'>
              <TabsTrigger value='login'>Login</TabsTrigger>
              <TabsTrigger value='signup'>Signup</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='px-6 pb-10'>
          <div className='max-w-[324px] mx-auto'>
            {selectedTab === 'login' ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>
      <div
        className='hidden md:flex md:w-1/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/images/chatbot.png')" }}
      ></div>
    </div>
  );
}
