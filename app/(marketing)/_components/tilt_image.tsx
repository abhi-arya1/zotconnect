import React from 'react';
import Tilt from 'react-parallax-tilt';

const TiltImage = () => {
  return (
    <Tilt className="parallax-effect-glare-scale mt-5" style={{ height: '300px', backgroundColor: 'darkgrey' }} glareEnable={true} glareMaxOpacity={0.45} scale={1.02}>
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
        <img className='drop-shadow-2xl'style={{width: '500px', height: '100px'}} src="zotconnect.png" alt="tilt-img" />
      </div>
    </Tilt>
  );
};

export default TiltImage;
