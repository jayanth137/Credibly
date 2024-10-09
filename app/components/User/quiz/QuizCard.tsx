'use client';
import React from 'react';

// Dummy quiz data
const quizData = [
  {
    id: 1,
    question: 'What is Blockchain?',
    options: [
      'A decentralized ledger',
      'A type of database',
      'A cryptocurrency',
      'A peer-to-peer network',
    ],
    correct_answer: 'A decentralized ledger',
    userAnswer: 'A decentralized ledger', // Set to null if user has not answered
    summary:
      'Blockchain is a decentralized, distributed ledger technology that records transactions across many computers.',
  },
  {
    id: 2,
    question: 'What is Web3?',
    options: [
      'A new internet standard',
      'The third version of the internet',
      'Decentralized web applications',
      'All of the above',
    ],
    correct_answer: 'All of the above',
    userAnswer: null,
    summary:
      'Web3 refers to the next generation of the internet, emphasizing decentralization and user ownership.',
  },
  // Add more questions as needed
];

const QuizCard = () => {
  const { id, question, options, correct_answer, userAnswer, summary } =
    quizData[1]; // Example for the first question

  const handleClick = (selectedOption) => {
    console.log(`Selected Option: ${selectedOption}`);
    // Handle logic for setting user's answer here
  };

  return (
    <section className="  w-3/4   backdrop-blur-lg     bg-white/20 rounded-lg border border-white/20 shadow-lg m-12 p-12">
      <h3 className="text-white text-sm font-semibold">Question {id}/10</h3>

      <div className="flex items-start space-x-3 text-base md:text-lg mb-6">
        <h3 className="text-white text-4xl font-semibold">{question}</h3>
      </div>

      {/* Quiz Options */}
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-center space-x-3 mb-5 text-black bg-white rounded-lg py-6 px-3 text-lg md:text-sm active:text-neutral-50 active:bg-orange-500/90 ${
            userAnswer === opt
              ? userAnswer === correct_answer
                ? 'bg-green-200 text-green-800 font-semibold'
                : 'bg-red-200 text-red-800 font-semibold'
              : !summary
              ? 'md:hover:bg-orange-500/90 md:hover:text-neutral-50 cursor-pointer'
              : ''
          }`}
          onClick={() => handleClick(opt)}
          style={
            userAnswer === opt && userAnswer !== correct_answer && summary
              ? {
                  background: 'rgb(254 202 202 / 1)', // Red background for incorrect answer
                  color: 'rgb(127 29 29 / 1)', // Dark red text for incorrect answer
                }
              : {}
          }
        >
          <p>{opt}</p>
        </div>
      ))}

      {/* Display Summary if answer has been submitted */}
      {userAnswer && (
        <p className="mt-4 text-gray-700">
          <strong>Correct Answer:</strong> {correct_answer}
          <br />
          <strong>Summary:</strong> {summary}
        </p>
      )}
    </section>
  );
};

export default QuizCard;
