"use client";

import Typewriter from 'typewriter-effect';
import Footer from './_components/footer';
import TwoColumnSectionLeftImg from './_components/two_column_section_imgleft';
import TwoColumnSectionRightImg from './_components/two_column_section_imgright';
import TwoColumnSectionLeftImgSecond from './_components/two_column_section_imgleft_second';
import TwoColumnSectionRightImgSecond from './_components/two_column_section_imgright_second';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const LandingPage = () => {

  return (
    <div className="h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex items-center justify-center h-screen relative dark:bg-[#1F1F1F]">
        <img src="/zotconnect.png" className="max-w-[40%] mb-4 z-10" alt="ZotConnect Logo" />

        <div style={{ width: '450px', height: '450px' }} className="absolute bg-gradient-to-r from-customDarkBlue to-customLightBlue rounded-full blur-xl opacity-70 -bottom-20px left-1/2 transform -translate-x-1/2 z-0"></div>
      </div>
      
      <div className='text-4xl md:text-6xl font-bold items-center text-center justify-center h-screen mt-5 mb-2'> Welcome to <span style={{ color: '#1cb2d4', fontStyle: 'italic' }}>ZotConnect</span><span style={{fontStyle: 'italic'}}>!</span></div>

      <div className='typewriter-container w-full text-center pb-[400px] dark:bg-[#1F1F1F]'>
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

        {/* TODO: ADD LARGE SIGN UP HERE: 
        <Button >

        </Button> */}
        <TwoColumnSectionLeftImg title='Connections Tailored to You' description='Discover a world of connections and opportunities that align with your interests and experiences.'/>
        <TwoColumnSectionRightImg title='Get Your Resume Vetted' description='Harness the power of trained AI technology to get valuable feedback on your resume and cover letter.'/>
        <TwoColumnSectionLeftImgSecond title='Tools for Professors' description='Create precise job listings and find your ideal candidates.' />
        <TwoColumnSectionRightImgSecond title='Build Your Profile' description='In ZotConnect, your profile has the power of a resume and the simplicity of a note. Build, Improve, Get Hired!'/>

        <div className='text-2xl font-extrabold pt-52 pb-5' >FAQs</div>
          <div className='mb-15'>
          <Accordion type="single" collapsible className='flex flex-col items-left pl-20 pr-20 pb-25'>
            <AccordionItem value="item-1">
              <AccordionTrigger className='font-semibold'>What makes ZotConnect different from other professional tools, like LinkedIn?</AccordionTrigger>
              <AccordionContent className="flex justify-start">
                <p>ZotConnect focuses mainly on student and professor relations while other platforms, such as LinkedIn, focus on recruitment for corporate jobs. This allows for a platform built <b> specifically </b> for communication!</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='font-semibold'>How do you use ZotConnect efficiently?</AccordionTrigger>
              <AccordionContent className="flex justify-start">
              <p>Here is a link to our YouTube demonstration that showcases all the features and how to use them: <a className="underline" href="https://www.youtube.com/watch?v=QFD8afHcP_4" target="_blank">youtube.com/watch?v=QFD8afHcP_4</a></p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className='font-semibold'>Is my data secure with ZotConnect?</AccordionTrigger>
              <AccordionContent className="flex items-left">
                Yes! Student profiles can only be viewed by professors that are hiring and every step of the way is authenticated. Enhanced security updates are to come.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
);
};

export default LandingPage;