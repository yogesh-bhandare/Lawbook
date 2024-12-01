# Lawbook Redefining Legal Practice for Students

### Overview

Lawbook is a cross-platform mobile app designed to revolutionize how law students practice and prepare for trials. By providing a virtual moot court, AI-driven tools, and an extensive case library, Lawbook enables students to refine their legal skills, gain confidence in courtroom proceedings, and excel in their academic and professional pursuits.

### Motivation

Preparing for trials and judgments is often limited to theoretical knowledge or traditional moot court setups. Lawbook bridges this gap by offering a realistic, interactive platform for law students to practice, collaborate, and learn in a virtual environment. The app fosters critical thinking and analytical skills, helping students navigate the complexities of legal practice with ease.

![Lawbook Mockup](assets/images/mockup-1.png) 

### Features
   - **Virtual Moot Court:** Simulate real-life trials via video chat with an AI judge or real participants as judges and opponents.
   - **Document Presentation:** Present, share, and annotate documents during virtual courtroom sessions.
   - **AI Summarized Case Library:** Access a vast repository of cases and judgments, summarized using advanced AI tools.
   - **Progress Tracking:** Monitor skill development with milestone-based badges and detailed performance analytics.

### Tech Stack
- [Django Backend](https://github.com/yogesh-bhandare/lawbook-backend-api) (Python)

   - **Django:** Powers the backend logic for user management, case library access, and progress tracking.
   - **AI Summarization:** Utilizes Llama 3 for generating concise, accurate summaries of legal cases.
   - **Web Scraping:** Employs Selenium to gather the latest case studies and legal content from trusted online sources.
   - **Storage:** Integrates with AWS S3 for secure storage of user files and case documents.

- React Native Frontend

   - **React Native:** Delivers a seamless, cross-platform experience for Android and iOS devices.
   - **Stream SDK:** Powers the virtual courtroom’s video and chat functionality for smooth interactions.
   - **UI Design:** Built with Reanimated for a modern, animated, and user-friendly interface.
   - **OAuth Integration:** Streamlines authentication with Clerk, enabling secure, user-friendly logins.

 - Additional Features

   - **PostgreSQL Database (Neon DB):** Reliable and efficient database management for user data and case storage.
   - **CI/CD Pipeline:** Uses Docker and GitHub Actions for continuous integration and deployment, ensuring quick updates and scalability.

## Running App

You can download and use the Lawbook app to explore its features and functionality. Click the link below to download the app:

[Download Lawbook App](https://lawbook-apk.s3.us-east-1.amazonaws.com/download/Lawbook.apk)

![Lawbook Mockup](assets/images/mockup-2.png) 