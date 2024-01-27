import React from 'react';
import TiltImage from './tilt_image'; // Adjust the path as necessary

const TwoColumnSection = () => {
  return (
    <div className="container mx-auto px-4 mt-[200px]">
      <div className="flex flex-wrap -mx-4">
        {/* Left Column for the Image */}
        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          <TiltImage />
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
