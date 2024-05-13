# ZotConnect

### 🏆 [IrvineHacks 2024 Best Overall Winner](https://devpost.com/software/zotconnect-g6jhme)

## Our Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Clerk](https://img.shields.io/static/v1?style=for-the-badge&message=Clerk&color=6C47FF&logo=Clerk&logoColor=FFFFFF&label=)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

## Learn about ZotConnect

- [DevPost](https://devpost.com/software/zotconnect-g6jhme)
- [GitHub](https://github.com/abhi-arya1/zotconnect)
- [View Site](https://zotconnect.vercel.app)
- [View the IrvineHacks Feature Article on UCI's ICS Website](https://ics.uci.edu/2024/02/14/13-teams-recognized-at-irvinehacks-2024/)

## Development Team

- [Abhigyan Arya](https://abhiarya.net)
- [Rishi Srihari](https://www.linkedin.com/in/hrishikesh-srihari-3525061a1/)
- [Aaron Lin](https://www.linkedin.com/in/aaronlin592/)
- [Christopher Li](https://www.linkedin.com/in/chrisli191/)

## Inspiration

As first-year students, we quickly realized that a common goal among many students is to participate in research. Meanwhile, Professors want to find the right candidate to conduct it. Seems pretty simple, right? However, there lacks a simple solution where professors can communicate directly with students that meet their qualifications. The result? Students continually waste their time sending cold emails to uninterested professors; eager individuals overlook research projects due to general application platforms (like LinkedIn and Handshake) filtering out top choices, and messy flyers end up polluting our campus. Time and time again, we see students become discouraged from participating in research, claiming it as “too complicated”. So, how would we be able to expand UCI’s research opportunities to a larger student body? The answer: ZotConnect.

## What it does

ZotConnect is a web application meticulously crafted to establish straightforward communication between professors and students. Professors are encouraged to post jobs on an explore page, which gets filtered on the student’s view, matching students with the job that fits their skill sets, major, experiences, and more! This guarantees that professors receive applications from candidates precisely tailored to their criteria, eliminating the cumbersome task of sifting through hundreds of student applications. Additionally, we assist with all parts of the application process, using trained Google Gemini AI with the Google Cloud platform to review Student Resumes and Cover Letters, as well as profiles and quick-apply, with student application data only available to professors for security. Our innovative approach ensures that both professors and students enjoy an optimized and efficient process to address their needs.

## How we built it

ZotConnect operates with NextJS on the Vercel Platform for deployment, and is entirely built with TypeScript across the stack and styled with TailwindCSS. To ensure our users’ data was secure and access to certain features and pages was monitored, we used Clerk to authenticate users through every step of development, including email verification with a one-time-password. We associate students and professors with different database types, which are then used for getting queried information when we need it. When it came to collecting our users’ resumes—a key component to our Google Cloud-based AI-feedback model—we elected to use the EdgeStore CDN to serialize files into URLs to be viewed later on. Then, we used ConvexDB, a fullstack TypeScript platform to store user data and post data in two different SQL tables in JSON format, which creates a list of attributes tied to unique User IDs. Additionally, we built a custom query and mutation API within Convex to access and edit attributes of a user as they upload, edit, apply, and get connected!

## Challenges we ran into

- Creating multiple schemas, building two Database APIs, and working across different database platforms to have User Data and User Files instantaneously sync and display across platforms.
- Text Formatting and Parsing Forms on the Frontend
- Interoperability between Vercel and NodeJS File System libraries to parse resumé PDFs.

## Accomplishments that we're proud of

- Creating a polished and effective landing page.
- Strict Route Authentication using One-Time-Password Verification for Emails.
- Training Generative AI that learns progressively using User Data to critique and help students build resumes and Applicant Profiles that they are proud of.
- The numerous convenience features we’ve implemented (Different types of accounts, Quick-Apply to Positions, Applicant Contact, etc.)
- Meticulous Attention to detail within our site (e.g. light/dark mode, cursor-hover indicators, fun facts in loading page, gradients, etc.)
- Our cute logo :)

## What we learned

- We learned that teamwork and collaboration is still significant regardless of vastly different technological backgrounds.
- When building databases that heavily influence the frontend, make sure that the layout is stable, robust, and agreed upon by all developers.
- How to integrate multiple databases using primary key relations to create functions based on use-case and efficiency rather than what is easiest.

## What's next for ZotConnect

- Implement Post Comments and In-App Direct Messages to streamline communication
- Increase verification with SMS/Text Codes for New Profiles with Clerk.
- Expand to universities around the world → potential name change
- Keep tabs on our AI Model to make sure it’s learning accurately and safely.
- Add option to delete job postings and option to withdraw application from a job.
- Improve user experience on a vast range of platforms.

## Reproduction
While made with open source intentions, and the possibility for future contribution, Zotconnect is currently not open source. Please read our Software [License](./LICENSE.md) before attempting to reproduce this project.
