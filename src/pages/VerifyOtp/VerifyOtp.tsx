import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { Card, CardContent } from '../../ui/Card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../ui/input-otp';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
// import your verifyOTP and handleError functions
// import { verifyOTP } from '../../api/auth'
// import { handleError } from '../../utils/handleError'; 

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Must contain only letters and numbers')
    .length(6, 'Must be exactly 6 characters'),
});

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const email = new URLSearchParams(window.location.search).get('email');
  const [error, setError] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  const handleResendOTP = async () => {
    setError('');
    setIsResending(true);
    try {
      // await resendOTP({ email }); // <-- Implement your resend OTP logic here
      // toast.success('OTP resent successfully!');
    } catch (err: unknown) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto">
          <div className="text-center mb-6">
            <h1 className='text-4xl font-bold text-[#008080]'>
              Chatta<span className='text-orange-400 text-4xl'>Trader</span>
            </h1>
          </div>
          <Card>
            <CardContent className="pt-4">
              <h2 className='text-3xl font-bold text-center text-gray-900 mb-2'>
                Verify Your Email
              </h2>
              <p className='text-sm text-center text-gray-600 mb-4'>
                Please enter the verification code sent to your email
              </p>
              {error && (
                <div className='text-red-500 text-sm text-center mb-3'>
                  {error}
                </div>
              )}
              <Formik
                initialValues={{ otp: '' }}
                validationSchema={otpValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setError('');
                  try {
                    navigate('/'); // On success
                  } catch (err: unknown) {
                    console.error(err);
                    setError('Failed to verify code. Please try again.');
                    // handleError?.(err); // Optionally call a global error handler
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                  <Form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                      <div className="text-left">
                        <Label htmlFor='otp'>Verification Code</Label>
                      </div>
                      <div className="flex justify-center items-center">
                        <InputOTP
                          maxLength={6}
                          value={values.otp}
                          onChange={(value) => setFieldValue('otp', value)}
                          onBlur={handleBlur}
                          name="otp"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="text-left">
                        <ErrorMessage
                          name='otp'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                    </div>
                    <Button
                      type='submit'
                      className='w-full bg-[#008080]'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </Button>
                    <p className='text-sm text-center text-gray-600 mt-4'>
                      Didn't receive the code?{' '}
                      <button
                        type='button'
                        className='text-[#008080] hover:underline'
                        onClick={handleResendOTP}
                        disabled={isResending}
                      >
                        {isResending ? 'Resending...' : 'Resend'}
                      </button>
                    </p>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='w-1/2 hidden md:flex'>
        <img
          className='h-full w-full object-cover'
          src='/images/frame.jpeg'
          alt='ChattaTrader background'
        />
      </div>
    </div>
  );
};

export default VerifyOtp;