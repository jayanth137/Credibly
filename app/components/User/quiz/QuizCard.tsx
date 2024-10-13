'use client';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import mrDuck from '@/app/assets/mrDuck.svg';
import { useAccount } from 'wagmi';
import TransactionWrapper from '../../Wallet/TransactionWrapper';
import WalletWrapper from '../../Wallet/WalletWrapper';
import Mint from '../../Mint';

const QuizCard = ({ videoId }: { videoId: string }) => {
  const [quizData, setQuizData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userAnswerForCurrent, setUserAnswerForCurrent] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('/api/getQuestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: videoId }),
        });

        const data = await response.json();
        console.log('Quiz data:', JSON.stringify(data, null, 4));
        setQuizData(data);
        setCurrentQuestion(data.questions[0]);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      }
    };

    fetchQuizData();
  }, [videoId]);

  const handleClick = (selectedOption: string) => {
    if (userAnswers[currentQuestionIndex] !== undefined) return;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    const correctAnswer = currentQuestion.correct;
    const isAnswerCorrect = selectedOption === correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setUserAnswerForCurrent(selectedOption);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setCurrentQuestion(quizData.questions[nextIndex]);
        setUserAnswerForCurrent(null);
        setIsCorrect(null);
      }, 500);
    } else {
      setQuizFinished(true);
    }
  };

  // Badge assignment based on score percentage
  const getBadge = (percentage: number) => {
    if (percentage >= 80) return 'Gold';
    if (percentage >= 60) return 'Silver';
    if (percentage >= 40) return 'Bronze';
    return 'No Badge';
  };

  if (quizFinished) {
    const totalQuestions = quizData.questions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const badge = getBadge(percentage);

    return (
      <section className="w-3/4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/20 shadow-lg m-12 p-12">
        <div className="h-screen bg-gradient-to-br from-[#1a1b3b] to-[#000031] text-white overflow-hidden flex justify-evenly items-center mt-12">
          <div className="bg-slate-600 p-4 rounded-3xl space-y-6 ">
            <img
              src={mrDuck.src}
              alt="mr duck"
              className="mb-4 object-contain w-[473px] h-[277px]"
            />
            <div>
              <Mint
                score={percentage}
                trueAnswer={correctAnswers}
                badge={badge}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="w-24 h-24 bg-[#E5B622] rounded-full flex justify-center items-center font-bold text-4xl ">
              {percentage}
            </h3>
            <h2 className="mt-4">You have successfully completed</h2>
            <div className="mt-2">
              <h2>Achievement Level:</h2>
              <h2 className="text-yellow-400 text-2xl font-bold">
                {badge}
              </h2>{' '}
              {/* This will show the badge */}
            </div>
            <h2 className="mt-4">
              Number of correct answers: {correctAnswers}
            </h2>
            <h2>Number of wrong answers: {totalQuestions - correctAnswers}</h2>
            <h2>Total number of questions: {totalQuestions}</h2>
          </div>
        </div>
      </section>
    );
  }

  if (!quizData || !quizData.questions) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-white flex-col gap-5 text-center">
        <Lottie
          options={{
            animationData: require('@/public/Loader.json'),
            loop: true,
            autoplay: true,
          }}
          height={200}
          width={200}
        />
        <h1 className="font-bold text-xl">
          Please Hang on it may take up to a minute...
        </h1>
      </div>
    );
  }

  return (
    <section className="w-3/4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/20 shadow-lg m-12 p-12">
      <h3 className="text-white text-sm font-semibold">
        Question {currentQuestionIndex + 1}/{quizData.questions.length}
      </h3>

      <div className="flex items-start space-x-3 text-base md:text-lg mb-6">
        <h3 className="text-white text-4xl font-semibold">
          {currentQuestion.question}
        </h3>
      </div>

      {currentQuestion.options.map((opt: string, i: number) => (
        <div
          key={i}
          className={`flex items-center space-x-3 mb-5 text-black bg-white rounded-lg py-6 px-3 text-lg md:text-sm cursor-pointer ${
            userAnswerForCurrent === opt
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
          {isCorrect ? (
            <>
              <strong className="text-green-400">Correct!</strong> The answer
              is: {currentQuestion.correct}
            </>
          ) : (
            <>
              <strong className="text-red-400">Wrong!</strong> The correct
              answer is: {currentQuestion.correct}
            </>
          )}
        </p>
      )}
    </section>
  );
};

export default QuizCard;
