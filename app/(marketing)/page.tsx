import { Navbar } from './_components/navbar';


const LandingPage = () => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center
        md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <h1 className='text-4xl'>
          Hello
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;