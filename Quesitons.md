**Project Name**  
Credibly

**Tagline**  
Watch, Pause, and Mint Your Success

**Why are you participating for Based India?**  
We are a team of three passionate individuals specializing in web3, development, and AI. Our motivation to participate in Based India stems from our shared vision of utilizing blockchain technology to empower creators and learners in our community. We believe that onchain solutions can make education more accessible, transparent, and rewarding. Being a part of this regional Buildathon gives us the opportunity to build impactful solutions while connecting with like-minded individuals, developers, and innovators. As we aim to address the challenges faced by creators and learners in India, we are excited to leverage the Base ecosystem to bring our ideas to life and contribute to a more connected and empowered community. Additionally, the chance to showcase our project on a global stage motivates us to push the boundaries of what we can achieve together.

**What challenges are you focusing on?**  
We are addressing two major challenges in our community:  
1. **Access to Affordable Learning & Skill Validation**: Many learners struggle to find credible and affordable educational resources that provide real-world value. Traditional online courses often lack proper validation, leaving employers unsure about the skills of potential candidates.  
2. **Empowering Creators & Rewarding Learning**: Content creators need better ways to monetize their educational content and engage with their audience. There's also a need for systems that ensure creators are fairly rewarded for the value they provide.

**How does your submission address this challenge?**  
Credibly allows YouTube creators to seamlessly convert their educational videos into structured courses, offering interactive validation methods such as quizzes, code extraction from GitHub, and assignments. Upon successful completion, learners can mint an NFT certificate as proof of their skills, which can be shared and verified onchain. This process not only provides learners with a more affordable and engaging way to validate their skills but also allows creators to monetize their content efficiently through a revenue-sharing model. By building on the Base platform, we ensure that transactions are transparent, secure, and accessible, enhancing trust between creators and learners. Our project has the potential to democratize education by creating a decentralized ecosystem where knowledge is accessible, skills are verifiable, and creators are rewarded.

**Challenges we ran into**  
Throughout the development, we encountered several challenges:  
- **Technical Challenges with Testnet Integration**: We faced issues while trying to test NFTs on the [OpenSea Testnet](https://testnets.opensea.io/), as the site was showing internal server errors, preventing us from verifying our NFT deployments. Additionally, we encountered problems with [wallet.coinbase.com](https://wallet.coinbase.com), where the site was continuously loading, making it difficult to test wallet interactions. We managed to work around these issues by simulating transactions on other testing platforms and revising our deployment process.  
- **Combining Onchain Functionality with AI & Web3**: Integrating AI-based quiz generation with onchain validation required us to manage multiple technologies seamlessly. We ensured compatibility by rigorously testing each component and refining our APIs to handle complex workflows.  
- **Balancing User Experience with Security**: We strived to create a smooth user experience without compromising security, which required several iterations on how we handled authentication, wallet integration, and content delivery.

**Additional Features**  
During the Buildathon, we added several new features:  
- **Integration with Google Authentication (G-Auth)**: Simplifies the course creation process for creators, allowing easy video selection from their YouTube channels.  
- **Dynamic Course Validation**: Enhanced the AI quiz feature, ensuring that each learner gets a unique set of questions, making the learning and assessment process fair and challenging.  
- **Onchain Certificate Minting**: Implemented onchain NFT minting, allowing learners to mint certificates as proof of completion, which are shareable and verifiable on the blockchain.

**Technologies we used**  
React, TypeScript, Node.js, Tailwind CSS, OpenAI, Base, Coinbase Wallet, GitHub API, OpenZeppelin, Solidity