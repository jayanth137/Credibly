<p align="center">
  <a href="" rel="noopener">
    <img src="https://i.imgur.com/AZ2iWek.png" alt="Credibily logo"></a>
</p>

<h3 align="center">Credibily</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-BASED_INDIA-orange.svg)](http://hackathon.url.com)  
[![Status](https://img.shields.io/badge/status-active-success.svg)]()  
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> Credibily is a platform that empowers YouTube creator-teachers to create interactive courses for their educational videos. It allows them to offer quizzes and mint certificates for learners, leveraging AI for assessment generation and IPFS for decentralized storage.
    <br>
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Usage](#usage)
- [Disclaimer](#disclaimer)
- [Flowchart](#flowchart)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Technology Stack](#tech_stack)
- [Dependencies / Limitations](#limitations)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

---

## 🧐 Problem Statement <a name = "problem_statement"></a>

### IDEAL:
Learners who consume educational content on YouTube do not currently have a way to validate or showcase their learning. There’s a need for a system where they can not only follow along with content but also take assessments and receive verifiable certificates.

### REALITY:
Many learners acquire valuable skills from YouTube, but they have no formal recognition for their efforts. YouTube content creators, especially those teaching technical or academic subjects, have no easy way to offer structured courses or assessments.

### CONSEQUENCES:
Without a way to validate learning, YouTube learners are unable to prove their skills in formal environments, such as job applications or academic settings. Creators, too, are missing opportunities to monetize structured courses or offer added value to their audience.

---

## 💡 Idea / Solution <a name = "idea"></a>

Credibily is a platform for YouTube creators who teach and want to offer their audience a way to validate their learning. Creators can log in using their Google account, select the video they want to create a course for, fill in details like descriptions, tags, and assessments. 

For now, Credibily supports AI-generated quizzes, but in the future, we will add project-based evaluations via GitHub and peer-to-peer reviews. Once the creator completes the course creation, a unique link is generated, which can be added to the YouTube video description. Viewers can follow the link, take the AI-generated quiz, and if they pass the set criteria, they can mint a certificate to showcase their learning.

---

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- **Quiz Method Feasibility**: While the quiz method works well, not all learning types may fit a multiple-choice format.
- **Monetary Benefits**: Needs further discussion on how creators can monetize and the impact on user affordability.
- **Gmail Requirement**: Users and creators must log in with Google accounts, and videos must have transcripts uploaded.
- **Quiz Types**: Currently only supporting quizzes, but project-based evaluations and peer assessments will come in the future.

---

## 🚀 Future Scope <a name = "future_scope"></a>

- **Project-based evaluations**: Integration with GitHub for submitting projects and validating learning through code.
- **Peer-to-peer assessments**: Learners evaluating each other’s projects for greater engagement.
- **Expanded assessment types**: Add variety to the current quizzes by introducing case studies, subjective questions, etc.
- **Additional blockchain integration**: Beyond certificates, exploring how to tokenize course achievements and build creator economies.

---

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js and npm
- MongoDB
- React
- IPFS

```bash
# Install Node.js and npm
sudo apt install nodejs npm

# Install MongoDB
sudo apt install mongodb

# Set up IPFS
npm install ipfs
ipfs init
ipfs daemon
```

### Installing

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/Credibily.git
   cd Credibily
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

---

## 🎈 Usage <a name="usage"></a>

1. **Creator Flow**:
   - Login via Google (OAuth).
   - Select the YouTube video for the course.
   - Add course details such as description, tags, and quiz type (currently only MCQs).
   - Share the generated course link on the YouTube description for users.

2. **User Flow**:
   - Click on the course link in the YouTube video description.
   - Pay the course fee.
   - Take the AI-generated quiz (no repeated questions).
   - Mint the certificate if the passing criteria are met.

---

## 🔄 Flowchart <a name="flowchart"></a>

1. **Creator Flow**:
   - Google OAuth for login → Select YouTube video → Fill course details → Generate course link → Share on YouTube.

2. **User Flow**:
   - Click course link → Pay fee → Take quiz → Pass quiz → Mint certificate.

*Flowcharts will be added as part of the project documentation.*

---

## ⛏️ Built With <a name = "tech_stack"></a>

- **React**: Frontend framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for fast UI development.
- **IPFS**: Decentralized storage for certificates and quizzes.
- **MongoDB**: Database for storing user, course, and certificate data.
- **Node.js**: Backend framework to manage server-side functionality.
- **Express.js**: Web application framework for Node.js.

---

## ✍️ Authors <a name = "authors"></a>

- [@Kartik Aslia](https://github.com/kartik) - Concept & Initial Work

---

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- Special thanks to all contributors and the open-source community for their support.

---

This README provides a comprehensive overview of **Credibily**, the platform for creating YouTube-based courses, AI quizzes, and certificate minting. Would you like to dive deeper into any specific section or include more technical details?