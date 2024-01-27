import React from 'react';
// import TiltImage from './tilt_image'; // Adjust the path as necessary
import Tilt from 'react-parallax-tilt';

const TwoColumnSection = () => {
  return (
    <div className="container mx-auto px-4 mt-[200px]">
      <div className="flex flex-wrap -mx-4">
        {/* Left Column for the Image */}
        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          {/* <TiltImage /> */}
          <Tilt className="parallax-effect-glare-scale mt-5" style={{ height: '300px', backgroundColor: 'darkgrey' }} glareEnable={true} glareMaxOpacity={0.45} scale={1.02}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                <img className='drop-shadow-2xl'style={{width: '500px', height: '100px'}} src="zotconnect.png" alt="tilt-img" />
            </div>
            </Tilt>
        </div>

        {/* Right Column for the Text */}
        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          <div className="text-box">
            {/* Your text content goes here */}
            <h2 className="text-3xl font-bold mb-4">Explore New Opportunities</h2>
            <p className="text-lg">
              Discover a world of connections and opportunities with ZotConnect. Connect with alumni, network with professionals, and explore new career paths.
            </p>
            {/* Add more content as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnSection;
