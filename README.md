# Credibily

<p align="center">
  <img src="https://i.imgur.com/AZ2iWek.png" alt="Project Logo" />
</p>
<h3 align="center">A platform for validating YouTube learning with AI-generated quizzes and certificates</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-BASED_INDIA-orange.svg)](http://hackathon.url.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/jayanth137/Credibly)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jayanth137/Credibly/blob/main/LICENSE.md)
[![Repo Size](https://img.shields.io/github/repo-size/jayanth137/Credibly)](https://github.com/jayanth137/Credibly)
[![GitHub Issues](https://img.shields.io/github/issues/jayanth137/Credibly)](https://github.com/jayanth137/Credibly/issues)

</div>

## 📝 Table of Contents
- [Problem Statement](#problem-statement)
- [Idea / Solution](#idea--solution)
- [User Flow](#user-flow)
- [Creator Flow](#creator-flow)
- [Roadmap](#roadmap)
- [Setting up a Local Environment](#setting-up-a-local-environment)
- [Technology Stack](#technology-stack)
- [Dependencies / Limitations](#dependencies--limitations)
- [Course Page for Users](#course-page-for-users)
- [Creator Courses Page](#creator-courses-page)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## 🧐 Problem Statement <a name="problem-statement"></a>

**IDEAL**: Learners from YouTube often do not have a structured way to validate their knowledge or showcase their learning. The ideal solution is a platform that allows them to validate their understanding through quizzes or projects, with certificates that can be minted as NFTs.

**REALITY**: Currently, there is no seamless method for YouTube learners to authenticate their learning and get certificates for it. Course creators, especially those on YouTube, struggle to assess learner understanding without creating custom quizzes or validation systems.

**CONSEQUENCES**: Without a platform like this, learners miss out on the opportunity to validate their skills learned through YouTube, and creators lack an additional revenue stream.

## 💡 Idea / Solution <a name="idea--solution"></a>
Credibily is a platform that empowers YouTube creators to create courses from their learning videos. Creators can simply log in with their Google account, select a YouTube video, and configure the course by adding descriptions, tags, and assessment methods. Our AI generates a quiz (10 MCQs) for each user attempting to validate their learning, ensuring no questions are repeated, and that fairness is maintained.

Once the course is created, a shareable link is generated that the creator can add to their YouTube video description. Learners can click on this link, complete the quiz or other validation methods, and mint a certificate if they meet the creator-set criteria. This certificate can be minted as an NFT and shared as proof of learning.

## 🔀 **User Flow** <a name="user-flow"></a>
![User Flow](flowcharts/User%20Flow.png)

## 🔀 Creator Flow <a name="creator-flow"></a>
![Creator Flow](flowcharts/Creator%20Flow.png)

## 🚀 Roadmap <a name="roadmap"></a>

### 3-Month Goals
- Add project-based evaluation via GitHub integration.
- Implement peer-to-peer assessments.
- Expand quiz question types beyond MCQs (e.g., coding challenges).
- Streamline Google Auth API for faster course creation.
- Enhance UI for easier course management.

### 6-Month Goals
- Develop a mobile app to increase accessibility for creators and learners.
- Introduce additional validation methods (e.g., peer reviews).
- Implement creator dashboards for detailed analytics on learner performance.
- Integrate a more advanced AI model for dynamic quiz generation based on learner history.
- Expand to other platforms besides YouTube (e.g., Twitch or Udemy).
  
## 🏁 Setting up a Local Environment <a name="setting-up-a-local-environment"></a>

### Prerequisites

Ensure you have the following installed:
- Node.js (v20+)
- npm or yarn
- MongoDB
- Pinata for IPFS integration
- Solidity (for smart contract interactions)
- GAuth credentials for Google authentication

### Installing

Clone the repository and navigate into it:

```bash
git clone https://github.com/jayanth137/Credibly.git
cd credibily
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the following:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
GAUTH_CLIENT_ID=your_google_auth_client_id
GAUTH_CLIENT_SECRET=your_google_auth_secret
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGO_URI=your_mongodb_uri
DATABASE_URL=your_database_url
PINATA_API_KEY=your_pinata_key
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_gateway_url
NEXT_PUBLIC_CDP_API_KEY=your_cdp_api_key
NEXT_PUBLIC_WC_PROJECT_ID=your_wc_project_id
PAYMASTER_AND_BUNDLER_ENDPOINT=your_paymaster_and_bundler_endpoint
```

Run the development server:

```bash
npm run dev
```

Your app should be running on [http://localhost:3000](http://localhost:3000).


## ⛏️ Technology Stack <a name="technology-stack"></a>

- **React.js** - Frontend
- **Tailwind CSS** - Styling
- **IPFS via Pinata** - For storing quiz metadata and NFT certificates
- **Solidity** - For smart contract interactions with NFTs
- **Next.js** - SSR and API routes
- **Express.js** - Backend framework
- **TypeScript** - Type safety
- **Google OAuth** - For authentication
- **Prisma** - ORM for database management
- **Pinata** - IPFS file storage

## ⛓️ Dependencies / Limitations <a name="dependencies--limitations"></a>

### Dependencies
- Google API for video transcript extraction
- MongoDB for database management
- Pinata for IPFS storage of certificates and metadata
- Solidity for NFT smart contracts
- Prisma for efficient database management
- AI Model for quiz generation

### Limitations
- AI-generated quizzes are currently limited to MCQ format.
- Limited customization options for certificates at this stage.
- Dependency on YouTube for transcript extraction could be limited by video format or availability.

## 🌐 Course Page for Users <a name="course-page-for-users"></a>

Learners can explore courses created by YouTube content creators. They can complete a quiz based on the video content and, if they meet the criteria, mint a certificate as proof of learning.

**[Experience a live course page](https://credibly.vercel.app/certify/jayanthkoppala2168/How_to_Build_a_Blockchain_Enterprise_Platform_Demo_Video)**.

## 🌐 Creator Courses Page <a name="creator-courses-page"></a>

Content creators can manage their courses, view learner statistics, and configure their YouTube videos as full courses using our platform.

**[Explore the live creator courses page](https://credibly.vercel.app/creator/jayanthkoppala2168)**.

## ✍️ Authors <a name="authors"></a>

- **Kartik Aslia**
- **Jayanth**
- **Kaushik**

See the list of [contributors](https://github.com/jayanth137/Credibly/contributors) who participated in this project.

## 🎉 Acknowledgments <a name="acknowledgments"></a>

We require users' Google account details to access YouTube transcripts and facilitate course creation. Special thanks to all contributors and hackathon supporters!

