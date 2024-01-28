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
        <TwoColumnSectionLeftImg title='Explore New Opportunities' description='Discover a world of connections and opportunities with ZotConnect. Connect with alumni, network with professionals, and explore new career paths.'/>
        <TwoColumnSectionRightImg title='Get Your Resume Vetted' description='Harness the power of trained AI technology to get valuable feedback on your resume.'/>
        <TwoColumnSectionLeftImgSecond title='Professor Utilities' description='Harness the power of trained AI technology to get valuable feedback on your resume.' />
        <TwoColumnSectionRightImgSecond title='Professor Utilities' description='Harness the power of trained AI technology to get valuable feedback on your resume.'/>

        <div className='text-2xl font-extrabold pt-52 pb-5' >FAQs</div>
          <div className='mb-15'>
          <Accordion type="single" collapsible className='flex flex-col items-left pl-20 pr-20 pb-25'>
            <AccordionItem value="item-1">
              <AccordionTrigger className='font-semibold'>Is it accessible?</AccordionTrigger>
              <AccordionContent className="flex items-left">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='font-semibold'>TEST</AccordionTrigger>
              <AccordionContent className="flex items-left">
                Yes. It adheres to the WAI-ARIA design pattern.
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