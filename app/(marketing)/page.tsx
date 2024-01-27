import React from 'react'
import { Navbar } from './_components/navbar';


const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='container mx-auto my-4'>
        <h1 className='text-4x1'>
          Hello
        </h1>
      </div>
    </>
  );
};

export default App;