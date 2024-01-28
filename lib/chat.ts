"use client";

// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const CL_API_KEY = process.env.NEXT_PUBLIC_CL_GG_KEY || "Err"
const CLgenAI = new GoogleGenerativeAI(CL_API_KEY);
const CLmodel = CLgenAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const CLchat = CLmodel.startChat({
    generationConfig,
    safetySettings,
    history: [
      
    ],
  });


  const CV_API_KEY =process.env.NEXT_PUBLIC_CV_GG_KEY || "Err"
  
  const CVgenAI = new GoogleGenerativeAI(CV_API_KEY);
  const CVmodel = CVgenAI.getGenerativeModel({ model: MODEL_NAME });

  
    const CVchat = CVmodel.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          "role": "user",
          "parts": [`Please use STRICT Markdown Syntax and English Only, and provide a title of "Detailed Resume Review" as bolded text and then numbered bullet points for each section, with new lines in MARKDOWN SYNTAX in between each section. Please provide a detailed review of the following Resume. Do NOT provide feedback on Formatting. Please include SPECIFIC DETAILED FEEDBACK that follows Modern Job Resume Trends and directly and exactly applies to this letter and this letter alone. If you are making a suggestion, provide context and where it is in the text: ABHIGYAN ARYA
          US Citizen — abhigyaa@uci.edu — abhiarya.net — ° linkedin.com/in/abhiaarya —  github.com/abhi-arya1
          EXPERIENCE
          NASA Johnson Space Center | github.com/Team-Cartographer/SUITS-2024-LMCC Irvine, CA & Houston, TX
          SUITS Research Project Manager and Full Stack Developer Intern Dec 2023 — May 2024
          • Developed modern frontend UI and custom API library for a Local Mission Control App with NextJS and React in TypeScript.
          • Solely built API Server and Data Pipeline with Flask and SQLite3 to interface with NASA Telemetry Streams for Mission Data.
          Building OpenCV & A∗ Pathfinding pipeline in Python with this server for HoloLens2 AR Devices
          • Developed Shell (Bash) and Powershell scripts to expedite deployment of app environment for Windows, MacOS, and Linux.
          • Managing GitHub, Code Reviews, AR Integration, and Test Automation strategies for both frontend and backend frameworks.
          • Invited to Test Week at Johnson Space Center in May 2024 and creating research paper on Space Environment Image Processing
          algorithms with Mentors at UC Irvine, Davis, & Merced.
          UCI CubeSat | projects.eng.uci.edu/projects/2023-2024/uci-cubesat Irvine, CA
          Avionics Software Engineer Sep 2023 — Present
          • Sole first-year avionics engineer developing Central Flight Computer/Attitude Determination Control System Software for a 2U
          CubeSat with payload control, power management, sun sensing, data broadcasting, and more.
          • Built a mathematically responsive simulation for orientation angles in Python/MatPlotLib. (GitHub). Currently working on Raspberry Pi Driver Development and implementing NASA’s F-Prime Flight Framework, with Linux/BASH and extensive C++.
          2023 NASA App Development Challenge | github.com/Team-Cartographer/cartographerADC23 Anaheim, CA & Houston, TX
          Data and Lead 3D-Visualization Developer Sep 2022 — Apr 2023
          • Engineered 3D Visualization in Python for Lunar Surface Projections from NASA’s Lunar Recon Orbiter, using Seaborn, MatPlotLib,
          and Panda3D. Worked on Frontend UI, Linear Transform Mapping Algorithm, and Randomized Texture Generation with Pillow.
          • Placed Top 3 Nationwide (out of 100+ teams) and presented application, outreach programs, and solutions to panel of Artemis
          Program Engineers at Johnson Space Center.
          2023 NASA Space Apps Hackathon | github.com/Team-Cartographer/Space-Apps-2023-Data Pasadena, CA
          Data and Machine Learning Engineer Oct 2023
          • In 38 Hours; Built Data Processing Pipeline with Extended Kalman Filtration, TensorFlow Keras, NumPy, MatPlotLib to detect
          solar flare anomalies and predict solar radiation intensities globally. Created visualization (solarstorm.earth) using NextJS.
          • Won LA Regional Competition and placed Top 500 Globally (out of 5000+ teams).
          2023 Kibo Robot Programming Challenge | github.com/Team-Cartographer/Kibo-RPC Anaheim, CA
          Avionics Software Developer Oct 2023
          • Built Avionics Framework with Java for Astrobee Robots on the International Space Station, and solely placed Top 10 Nationwide.
          • Used OpenCV and AruCo for object and code detection, Quaternion-based Movement, and built a custom Node-Based Movement
          Algorithm to optimize movement strategy, scores and runtime.
          UCI School of Social Sciences Irvine, CA
          Research Intern under Prof. Kristen Monroe Jun 2022 — Aug 2022
          • Co-authored a white paper with a group of interns to provide a comprehensive report and solutions to social prejudice and biases
          instilled in AI Models and Technological Education contrasted with historical examples. Created simulations in Python.
          EDUCATION
          University of California, Irvine Sep 2023 — June 2027 (Expected)
          B.S. Computer Science and Engineering GPA: 4.0/4.0, Dean’s Honor List Irvine, CA
          Relevant Coursework: ICS33 Python Programming with Software Libraries, ICS45C C/C++ Programming, ICS 6B/6D Boolean Algebra
          & Discrete Structures, MATH 2D & 3A: Calculus III and Linear Algebra
          PROJECTS
          Team Cartographer | github.com/Team-Cartographer Sep 2022 — Present | Orange County, CA,
          • Co-Founder and Lead Developer at an emerging STEM Education Nonprofit specializing in space and NASA-related coding challenges
          to enhance STEM learning. Worked with Avionics, Full Stack Web Dev, Data Engineering and Analysis, and Augmented Reality.
          • Responsible for team leadership, GitHub management, software design, project planning, outreach, and development.
          Jotster | github.com/abhi-arya1/jotster React, NextJS, Vercel, TypeScript, TailwindCSS, Convex, Clerk
          • Developed an adaptive Markdown-based note-taking application from scratch, inspired by Notion. Used Shadcn Libraries for clean
          and modern viewing frames and Clerk for User Authentication and Secure Note-Taking.
          • Learned UI/UX Development, Backend Optimization with ”Archive” features and Note Publishing Capabilities, and a variety of
          skills for web application creation. View Jotster at jotster.vercel.app
          Copilot Avionics Module | github.com/abhi-arya1/copilot-avionics-module C++, Arduino, Embedded Software, PCBs
          • Developed a compact and power-efficient Central Flight Computer for amateur rocket flight, incorporating Teensy 4.1, 9-DoF IMU,
          and Altimeter with Data Logging features, focusing on space and power efficiency.
          • Developed firmware using an optimized state-machine architecture in C++, including a framework for user configuration and support
          for various flight types.
          SKILLS
          • Languages: Python, C/C++, JavaScript & TypeScript, Java, GoLang, C#, SQLite3, HTML/CSS & TailwindCSS, Bash
          • Libraries: NodeJS, NumPy, MatPlotLib, TensorFlow, OpenCV, Flask, React/React Native, NextJS & Vercel, Express, Electron
          • Technologies/Other: Hindi (Fluent), Arduino, MATLAB, Fusion360, Unity & Microsoft MRTK, GitHub, AWS, ConvexDB, Clerk
          Auth`]
        },
        {
          "role": "model",
          "parts": [`**Detailed Resume Review**

          **Experience**
          
          - Quantify achievements with measurable results and data. For example, instead of "Developed modern frontend UI and custom API library," you could write "Developed modern frontend UI and custom API library that resulted in a 20% improvement in user engagement."
          - Use more action-oriented verbs. For example, instead of "Solely built API Server and Data Pipeline," you could write "Architected and implemented API Server and Data Pipeline."
          - Consider using bullet points for clarity and readability.
          
          **Education**
          
          - Consider adding a dedicated section for relevant coursework.
          - Include GPA, Dean's Honor List, and any relevant awards or honors.
          
          **Projects**
          
          - Include more technical details and accomplishments for each project.
          - Showcase how projects align with your career goals and demonstrate your skills and knowledge.
          - Provide links to any open-source projects or code repositories.
          
          **Skills**
          
          - Organize skills into relevant categories, such as programming languages, frameworks, libraries, and tools.
          - Use a skills matrix to visually represent your proficiency level in each skill.
          
          **Additional Feedback**
          
          - Consider adding a summary statement at the beginning of the resume to highlight your career aspirations and key skills.
          - Use concise and action-oriented language throughout the resume.
          - Ensure consistency in formatting and font size for a professional appearance.
          - Proofread carefully for any typos or grammatical errors.
          
          **Specific Feedback**
          
          - In the NASA Johnson Space Center experience, you mention "Invited to Test Week at Johnson Space Center in May 2024." Consider adding more details about what you will be doing during Test Week and what the expected outcomes are.
          - In the UCI CubeSat experience, you mention "Currently working on Raspberry Pi Driver Development and implementing NASA's F-Prime Flight Framework." Consider adding more details about the specific tasks you are responsible for and the progress you have made so far.
          - In the 2023 NASA App Development Challenge experience, you mention "Placed Top 3 Nationwide (out of 100+ teams)." Consider adding more details about the competition, such as the number of participants, the judging criteria, and the specific aspects of your project that were recognized.
          - In the 2023 NASA Space Apps Hackathon experience, you mention "Won LA Regional Competition and placed Top 500 Globally (out of 5000+ teams)." Consider adding more details about the competition, such as the number of participants, the judging criteria, and the specific aspects of your project that were recognized.
          - In the 2023 Kibo Robot Programming Challenge experience, you mention "Built Avionics Framework with Java for Astrobee Robots on the International Space Station, and solely placed Top 10 Nationwide." Consider adding more details about the competition, such as the number of participants, the judging criteria, and the specific aspects of your project that were recognized.`]
        },
      ],
    });

async function chatWithCoverLetterModel(input: string) {
  const result = await CLchat.sendMessage(input);
  const response = result.response;
  console.log(response.text());
  return response
}

async function chatWithResumeModel(input: string) {
    const result = await CVchat.sendMessage(input);
    const response = result.response;
    console.log(response.text());
    return response
  }

export { chatWithCoverLetterModel, chatWithResumeModel };


// const Test = () => {
//   const [responseText, setResponseText] = useState('Loading...');

//   useEffect(() => {
//     const fetchChatResponse = async () => {
//       try {
//         const response = await runChat("Tell me the 10 best things to put in a cover letter");
//         setResponseText(response.text()); // Assuming response has a text method
//       } catch (error) {
//         console.error('Error fetching chat response:', error);
//         setResponseText('Error fetching response');
//       }
//     };

//     fetchChatResponse();
//   }, []);

//   return (
//     <div>
//       {responseText}
//     </div>
//   );
// };

// export default Test;