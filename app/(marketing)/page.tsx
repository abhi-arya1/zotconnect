"use client";

import { Navbar } from './_components/navbar';
import Typewriter from 'typewriter-effect';


const LandingPage = () => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <img src="/zotconnect.png" className="mb-4 " />
      <h1 className='text-4xl md:text-6xl font-bold mb-8 text-center justify-center h-screen'> Welcome to <span style={{ color: '#1cb2d4', fontStyle: 'italic' }}>ZotConnect</span></h1>

      <div className='typewriter-container'>
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString('Connect with <span class="highlight">professors</span>.')
                    .pauseFor(700)
                    .changeDeleteSpeed(35)
                    .deleteChars(11) // Adjust the number based on how many characters you want to remove
                    .typeString('<span class="highlight">other students</span>.')
                    .pauseFor(700)
                    .deleteChars(15) // Adjust the number based on how many characters you want to remove
                    .typeString('<span class="highlight">UCI alumni</span>.')
                    .start()
                    .pauseFor(700)
                    .deleteChars(11) // Adjust the number based on how many characters you want to remove
                    .typeString('<span class="highlight">companies</span>.')
                    .pauseFor(700)
                    .deleteChars(23)// Adjust the number based on how many characters you want to remove
                
                typewriter.typeString('Get your resume vetted by AI')
            }}
        />
      </div>
      
    </div>
);
};

export default LandingPage;