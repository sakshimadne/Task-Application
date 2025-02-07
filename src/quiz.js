import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
]

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const [timeLeft, setTimeLeft] = useState(300)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      toast.error("Time's up! Quiz ended.")
    }
  }, [timeLeft])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const checkAnswer = () => {
    if (!selectedOption) return

    if (selectedOption === quizData[currentQuestion].answer) {
      toast.success('Correct! Moving to next question.')
      setCurrentQuestion((prev) => prev + 1)
      setAttemptsLeft(3)
      setSelectedOption(null)
    } else {
      if (attemptsLeft > 1) {
        setAttemptsLeft(attemptsLeft - 1)
        toast.error(`Wrong! Attempts left: ${attemptsLeft - 1}`)
      } else {
        toast.error(
          `No attempts left! Correct answer: ${quizData[currentQuestion].answer}`
        )
        setCurrentQuestion((prev) => prev + 1)
        setAttemptsLeft(3)
        setSelectedOption(null)
      }
    }
  }

  return (
    <div className='p-4 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>MCQ Quiz</h2>
      <p>
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
      </p>
      {currentQuestion < quizData.length ? (
        <div>
          <h3 className='mb-2'>{quizData[currentQuestion].question}</h3>
          {quizData[currentQuestion].options.map((option, index) => (
            <div key={index} className='flex items-center mb-1'>
              <input
                type='radio'
                id={`option-${index}`}
                name='option'
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className='mr-2'
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button
            onClick={checkAnswer}
            className='mt-2 p-2 bg-blue-500 text-white rounded'
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <p>Quiz Completed!</p>
      )}
      <Toaster position='top-center' />
    </div>
  )
}

export default QuizApp
