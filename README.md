# NeuroNest Search Engine Project

## Course Information
This project is part of the AI-Powered Search with Google Discovery Engine course offered by Neuronest. You can find more information about the course at:
[https://app.neuronest.live/course/ai-powered-personal-search-engine](https://app.neuronest.live/course/ai-powered-personal-search-enginee)

## Project Description
This project is a Next.js application that implements an AI-powered search engine using Google's Discovery Engine API. The application provides a user-friendly interface for searching NeuroNest-related information, displays search results, and presents AI-generated answers along with related questions.

## Technologies Used
- Next.js
- React
- Google Cloud (Discovery Engine API)
- Tailwind CSS
- Google Auth Library

## Prerequisites
- Node.js (version 18.17.0 or later)
- npm (version 9.0.0 or later)
- A Google Cloud account with Discovery Engine API enabled

## Setup
1. Clone this repository to your local machine.
2. Set up a Google Cloud project and enable the Discovery Engine API.
3. Create a service account and download the JSON key file.
4. Create a `.env.local` file in the root directory of the project and add the following environment variable:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-file.json
   ```
5. Install the project dependencies:
   ```bash
   npm install
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting
If you encounter any issues during setup or while running the application, please refer to the FAQ section in the course materials. For additional support, you can reach out to support@neuronest.live.

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Google Discovery Engine API, check out:
- [Google Discovery Engine Documentation](https://cloud.google.com/discovery-engine/docs)

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Note on Environment Variables
When deploying to a platform like Vercel, make sure to set up the `GOOGLE_APPLICATION_CREDENTIALS` environment variable securely. Do not include the actual service account JSON file in your repository. Instead, you may need to set up the credentials differently, such as using Vercel's encrypted environment variables feature.