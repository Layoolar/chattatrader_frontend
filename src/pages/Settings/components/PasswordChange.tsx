import { useState } from 'react';

export default function PasswordSection() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <div className='w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-800 mb-6'>
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='password'
          placeholder='Old Password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007b83]'
          required
        />
        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007b83]'
          required
        />
        <button
          type='submit'
          className='w-full bg-[#007b83] text-white py-2.5 px-4 rounded-lg hover:bg-[#005f63] transition-colors'
        >
          Save New Password
        </button>
      </form>
    </div>
  );
}
