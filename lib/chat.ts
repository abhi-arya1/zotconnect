"use client";

// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const CL_API_KEY = "AIzaSyB1UUlEU67DEt4AxUrw7iazRZSK9ZQ44XY"

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


  const CV_API_KEY = "AIzaSyD-_G7AlUYNSxrdDJS5H-4_Qhv1xY6s4dY"
  
  const CVgenAI = new GoogleGenerativeAI(CL_API_KEY);
  const CVmodel = CVgenAI.getGenerativeModel({ model: MODEL_NAME });

  
    const CVchat = CVmodel.startChat({
      generationConfig,
      safetySettings,
      history: [
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