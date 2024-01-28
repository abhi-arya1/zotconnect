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
          "parts": [``]
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