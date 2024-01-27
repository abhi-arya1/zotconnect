"use client";

import Typewriter from 'typewriter-effect';
import TwoColumnSection from './_components/two_column_section';
import Footer from './_components/footer';

const LandingPage = () => {
  return (
    <div className="h-full flex flex-col ">
      <div className="flex items-center justify-center h-screen relative">
        <img src="/zotconnect.png" className="max-w-[40%] mb-4 z-10" alt="ZotConnect Logo" />

        <div style={{ width: '450px', height: '450px' }} className="absolute bg-gradient-to-r from-customDarkBlue to-customLightBlue rounded-full blur-xl opacity-70 -bottom-20px left-1/2 transform -translate-x-1/2 z-0"></div>
      </div>
      
      <div className='text-4xl md:text-6xl font-bold items-center text-center justify-center h-screen mt-5 mb-2'> Welcome to <span style={{ color: '#1cb2d4', fontStyle: 'italic' }}>ZotConnect</span><span style={{fontStyle: 'italic'}}>!</span></div>

      <div className='typewriter-container w-full text-center pb-[400px]'>
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
                
                typewriter.typeString('Get your resume vetted by AI.')
                .pauseFor(600)
            }}
        />
        <TwoColumnSection title='Explore New Opportunities' description='Discover a world of connections and opportunities with ZotConnect. Connect with alumni, network with professionals, and explore new career paths.'/>

      </div>

      <Footer />
    </div>
);
};

export default LandingPage;