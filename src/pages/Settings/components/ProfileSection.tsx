import { useState } from 'react';

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className='w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-800 mb-6'>
        Profile Information
      </h2>

      <form onSubmit={handleProfileSubmit} className='space-y-4'>
        <input
          type='text'
          id='userName'
          placeholder='Username'
          value={formData.userName}
          onChange={handleInputChange}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007b83]'
          required
        />
        <input
          type='email'
          id='email'
          placeholder='Email Address'
          value={formData.email}
          onChange={handleInputChange}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#007b83]'
          required
        />
        <button
          type='submit'
          className='w-full bg-[#007b83] hover:bg-[#006972] text-white py-2.5 px-4 rounded-lg transition-colors'
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
