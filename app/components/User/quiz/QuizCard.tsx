'use client';
import React, { useState } from 'react';
import Data from '@/app/questionJSON/content.json';

const QuizCard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = Data.questions[currentQuestionIndex];

  const handleClick = (selectedOption: string) => {
    if (userAnswers[currentQuestionIndex] !== undefined) return;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    if (selectedOption === currentQuestion.correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < Data.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 500);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <section className="w-3/4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/20 shadow-lg m-12 p-12">
        <h1 className="text-white text-4xl font-semibold">Quiz Completed!</h1>
        <p className="text-gray-300 text-lg mt-4">
          Your final score is: <strong className="text-white">{score}/{Data.questions.length}</strong>
        </p>

        {/* Result Table */}
        <table className="table-auto w-full mt-6 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Your Answer</th>
              <th className="px-4 py-2">Correct Answer</th>
              <th className="px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {Data.questions.map((q: any, i: number) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{q.question}</td>
                <td className={`px-4 py-2 ${userAnswers[i] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {userAnswers[i]}
                </td>
                <td className="px-4 py-2">{q.correct}</td>
                <td className="px-4 py-2">
                  {userAnswers[i] === q.correct ? (
                    <span className="text-green-600 font-semibold">Correct</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Wrong</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  const userAnswerForCurrent = userAnswers[currentQuestionIndex];
  const isCorrect = userAnswerForCurrent === currentQuestion.correct;

  return (
    <section className="w-3/4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/20 shadow-lg m-12 p-12">
      <h3 className="text-white text-sm font-semibold">
        Question {currentQuestionIndex + 1}/{Data.questions.length}
      </h3>

      <div className="flex items-start space-x-3 text-base md:text-lg mb-6">
        <h3 className="text-white text-4xl font-semibold">{currentQuestion.question}</h3>
      </div>

      {currentQuestion.options.map((opt: string, i: number) => (
        <div
          key={i}
          className={`flex items-center space-x-3 mb-5 text-black bg-white rounded-lg py-6 px-3 text-lg md:text-sm cursor-pointer ${userAnswerForCurrent === opt
            ? isCorrect
              ? 'bg-green-100 text-green-800 border-green-600'
              : 'bg-red-100 text-red-800 border-red-600'
            : 'hover:bg-gray-200 text-black'
            }`}
          onClick={() => handleClick(opt)}
          style={{ pointerEvents: userAnswerForCurrent ? 'none' : 'auto' }}
        >
          <p>{opt}</p>
        </div>
      ))}

      {userAnswerForCurrent && (
        <p className="mt-4 text-gray-300">
          <strong className="text-white">Correct Answer:</strong> {currentQuestion.correct}
          <br />
        </p>
      )}
    </section>
  );
};

export default QuizCard;
