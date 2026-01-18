# doStack

##  Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-black)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1.3-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Zustand](https://img.shields.io/badge/Zustand-4.5-000545)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-1.15.15-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38BDF8?logo=tailwindcss&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-6.7.0-black)
![Groq](https://img.shields.io/badge/Groq-0.34.0-orange)


## Overview

doStack is a modern, AI-powered task management platform designed for teams that want to collaborate efficiently and work smarter. It helps teams organize work, track progress, and manage projects seamlessly — all in one place.

Built with a focus on productivity, clarity, and scalability, doStack enables teams to break down projects into manageable issues, assign responsibilities, and stay aligned through real-time collaboration. With an integrated AI assistant, teams can get intelligent suggestions, faster insights, and automated help throughout their workflow.

Whether you’re a small team or a growing organization, doStack provides a secure, flexible, and intuitive environment to manage work without unnecessary complexity.

## Features

- **Team Collaboration** – Work together with your team in a shared workspace  
- **Projects & Issues** – Create projects and manage tasks through structured issues  
- **Project Members** – Add, manage, and assign members to specific projects  
- **AI Assistant** – Get smart assistance for tasks, planning, and productivity  
- **Secure Authentication** – Robust and reliable user authentication system  
- **Role-Based Access Control (RBAC)** – Fine-grained permissions for better security and control


## Installation

 1. Clone the repository
 ``` bash
 git clone https://github.com/codebydeep/d-stack.git
 cd do-stack
 ```

 2. Install the required dependencies

 ``` bash
 cd backend
 npm install
 ```
 ``` bash
 cd frontend
 npm install
 ```

 3. Create the .env files
 ```bash
 cd backend
 PORT=your-port
 MONGO_URI=your-database-url
 JWT_SECRET=your-secret
 JWT_EXPIRY=your-expiry
 RESEND_API_KEY=your-api-key
 ```
 ```bash
 cd frontend
 VITE_API_BASE_URL=http://localhost:your-port/api

 ```
 4. Run the Server
 ```bash
 cd backend
 npm run dev
 ```
 ```bash
 cd frontend
 npm run dev
 ```
 5. Open the browser
 ```bash
 Checkout on - http://localhost:5173/
 ```

## License

This project is licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software.  
See the [LICENSE](./LICENSE) file for more details.