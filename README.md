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
- [How It Helps the Creator and the Learner](#how-it-helps-the-creator-and-the-learner)
- [Successor NFT Transactions](#successor-nft-transactions)
- [Contract Address](#contract-address)
- [Roadmap](#roadmap)
- [Setting Up a Local Environment](#setting-up-a-local-environment)
- [Technology Stack](#technology-stack)
- [Dependencies / Limitations](#dependencies--limitations)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## 🧐 Problem Statement <a name="problem-statement"></a>

**IDEAL**: Learners from YouTube often do not have a structured way to validate their knowledge or showcase their learning. The ideal solution is a platform that allows them to validate their understanding through quizzes or projects, with certificates that can be minted as NFTs.

**REALITY**: Currently, there is no seamless method for YouTube learners to authenticate their learning and get certificates for it. Course creators, especially those on YouTube, struggle to assess learner understanding without creating custom quizzes or validation systems.

**CONSEQUENCES**: Without a platform like this, learners miss out on the opportunity to validate their skills learned through YouTube, and creators lack an additional revenue stream.

## 💡 Idea / Solution <a name="idea--solution"></a>
Credibily is a platform that empowers YouTube creators to create courses from their learning videos. Creators can simply log in with their Google account, select a YouTube video, and configure the course by adding descriptions, tags, and assessment methods. Our AI generates a quiz (10 MCQs) for each user attempting to validate their learning, ensuring no questions are repeated, and that fairness is maintained.

Once the course is created, a shareable link is generated that the creator can add to their YouTube video description. Learners can click on this link, complete the quiz or other validation methods, and mint a certificate if they meet the creator-set criteria. This certificate can be minted as an NFT and shared as proof of learning.

## ⚠️ Disclaimer
1. You need to have a YouTube channel with videos, and the videos must have transcripts.
2. When you click *Join as a Creator*, a Google authentication page will pop up. You will need to proceed through the warnings. After that, you will be redirected to the page where you can create a course.

## 🔀 **User Flow** <a name="user-flow"></a>
![User Flow](flowcharts/User%20Flow.png)

The *User Flow* diagram outlines the process for learners. Key steps include:
1. Users access the course via a shareable link from a YouTube description.
2. They complete quizzes or assessments created by the AI model.
3. Upon successful completion, users can mint and receive certificates as NFTs, shareable across social platforms.

## 🔀 **Creator Flow** <a name="creator-flow"></a>
![Creator Flow](flowcharts/Creator%20Flow.png)

The *Creator Flow* diagram outlines the process for content creators. Key steps include:
1. Logging in via Google OAuth to access their YouTube videos.
2. Selecting videos and creating courses by adding descriptions and tags.
3. Configuring the course settings, including quiz parameters, before sharing a link for learners to access.

## 🧑‍🏫 How It Helps the Creator and the Learner <a name="how-it-helps-the-creator-and-the-learner"></a>
- **For Creators**: Provides an additional revenue stream through course validation, helps build a stronger learning community, and offers professional-grade certification for learners.
- **For Learners**: Offers a seamless way to validate their knowledge gained from YouTube videos and provides credible certificates that can be shared professionally.

## 🔗 Successor NFT Transactions <a name="successor-nft-transactions"></a>
Detailed information on how NFTs are transferred, minted, and managed on the blockchain. This will cover the flow of transactions from certificate issuance to NFT transfer and wallet interactions.

## 🏠 Contract Address <a name="contract-address"></a>
The current deployed smart contract address:
- **Ethereum Testnet Address**: `0x123...abc` (Please replace this with the actual contract address)

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

## 🏁 Setting Up a Local Environment <a name="setting-up-a-local-environment"></a>

### Prerequisites
Ensure you have the following installed:
- Node.js (v20+)
- npm or yarn
- MongoDB
- Pinata for IPFS integration
- Solidity (for smart contract interactions)
- GAuth credentials for Google authentication

### Installing
1. Clone the repository:
   ```bash
   git clone https://github.com/jayanth137/Credibly.git
   cd credibily
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:
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

4. Run the development server:
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

## ✍️ Authors <a name="authors"></a>
- **Kartik Aslia**
- **Jayanth**
- **Kaushik**

See the list of [contributors](https://github.com/jayanth137/Credibly/contributors) who participated in this project.

## 🎉 Acknowledgments <a name="acknowledgments"></a>
We require users' Google account details to access YouTube transcripts and facilitate course creation. Special thanks to all contributors and hackathon supporters!
