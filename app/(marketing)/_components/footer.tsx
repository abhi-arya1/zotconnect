import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-inherit text-inherit pb-9">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ZotConnect</p>
        <div className="flex space-x-4">

          <a href="mailto:support.zotconnect.com" className="text-sm hover:text-customDarkBlue">Contact Us</a>
          <a href="https://github.com/abhi-arya1/zotconnect" className="text-gray github-link hover:text-purple-500">
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
