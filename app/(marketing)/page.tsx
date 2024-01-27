"use client";

import { Navbar } from './_components/navbar';
import Typewriter from 'typewriter-effect';


const LandingPage = () => {
  return (
    <div className="h-full flex flex-col ">
      <Navbar />
      <div className='flex items-center justify-center h-screen'>
        <img src="/zotconnect.png" className="max-w-[40%] mb-4"/>
      </div>
      
      <h1 className='text-4xl md:text-6xl font-bold items-center text-center justify-center h-screen mb-2'> Welcome to <span style={{ color: '#1cb2d4', fontStyle: 'italic' }}>ZotConnect</span><span style={{fontStyle: 'italic'}}>!</span></h1>

      <div className='typewriter-container w-full text-center'>
        <Typewriter
            options={{
              loop: true
            }}
            onInit={(typewriter) => {
                typewriter.typeString('Connect with <span class="highlight">Professors</span>.')
                    .pauseFor(700)
                    .changeDeleteSpeed(35)
                    .deleteChars(11)
                    .typeString('<span class="highlight">Other students</span>.')
                    .pauseFor(700)
                    .deleteChars(15)
                    .typeString('<span class="highlight">UCI Alumni</span>.')
                    .start()
                    .pauseFor(700)
                    .deleteChars(11)
                    .typeString('<span class="highlight">Companies</span>.')
                    .pauseFor(700)
                    .deleteChars(25)
                
                typewriter.typeString('Get your resume vetted by AI')
            }}
        />
      </div>
      
    </div>
);
};

export default LandingPage;