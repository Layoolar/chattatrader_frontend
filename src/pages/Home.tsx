export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Welcome to My Tailwind Site
          </h1>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='border-4 border-dashed border-gray-200 rounded-lg p-8 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-4'>
              Tailwind is Working!
            </h2>
            <p className='text-gray-600 mb-6'>
              If you see styled components and blue heading, Tailwind CSS is
              properly configured.
            </p>
            <button className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Sample Button
            </button>
          </div>
        </div>
      </main>

      <footer className='bg-white border-t border-gray-200 mt-8'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-gray-500'>
            © 2023 My Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
