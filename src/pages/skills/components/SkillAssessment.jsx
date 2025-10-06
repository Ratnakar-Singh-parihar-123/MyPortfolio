import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillAssessment = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const quizzes = {
    react: {
      title: 'React Fundamentals',
      description: 'Test your knowledge of React concepts and best practices',
      icon: 'Atom',
      color: 'text-blue-500',
      questions: [
        {
          question: "What is the correct way to create a functional component in React?",
          options: [
            "function MyComponent() { return <div>Hello</div>; }",
            "const MyComponent = () => { return <div>Hello</div>; }",
            "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
            "Both A and B are correct"
          ],
          correct: 3,
          explanation: "Both function declarations and arrow functions are valid ways to create functional components in React."
        },
        {
          question: "Which hook is used to manage state in functional components?",
          options: [
            "useEffect",
            "useState",
            "useContext",
            "useReducer"
          ],
          correct: 1,
          explanation: "useState is the primary hook for managing local state in functional components."
        },
        {
          question: "What is the purpose of the useEffect hook?",
          options: [
            "To manage component state",
            "To handle side effects and lifecycle events",
            "To create context providers",
            "To optimize component rendering"
          ],
          correct: 1,
          explanation: "useEffect is used to handle side effects like API calls, subscriptions, and lifecycle events."
        }
      ]
    },
    javascript: {
      title: 'JavaScript ES6+',
      description: 'Evaluate your modern JavaScript knowledge',
      icon: 'Zap',
      color: 'text-yellow-500',
      questions: [
        {
          question: "What does the spread operator (...) do?",
          options: [
            "Creates a new array",
            "Spreads elements of an iterable",
            "Copies object properties",
            "All of the above"
          ],
          correct: 3,
          explanation: "The spread operator can be used to spread array elements, copy objects, and work with iterables."
        },
        {
          question: "Which method is used to create a new array with transformed elements?",
          options: [
            "forEach",
            "filter",
            "map",
            "reduce"
          ],
          correct: 2,
          explanation: "The map() method creates a new array with the results of calling a function for every array element."
        },
        {
          question: "What is the difference between let and const?",
          options: [
            "let is block-scoped, const is function-scoped",
            "const cannot be reassigned, let can be",
            "let is hoisted, const is not",
            "There is no difference"
          ],
          correct: 1,
          explanation: "const creates a binding that cannot be reassigned, while let allows reassignment."
        }
      ]
    },
    css: {
      title: 'CSS & Styling',
      description: 'Test your CSS and styling expertise',
      icon: 'Palette',
      color: 'text-purple-500',
      questions: [
        {
          question: "Which CSS property is used to create a flexbox container?",
          options: [
            "display: flex",
            "flex-direction: row",
            "justify-content: center",
            "align-items: center"
          ],
          correct: 0,
          explanation: "display: flex is the property that creates a flex container and enables flexbox layout."
        },
        {
          question: "What is the CSS Grid property for defining columns?",
          options: [
            "grid-columns",
            "grid-template-columns",
            "column-template",
            "grid-column-template"
          ],
          correct: 1,
          explanation: "grid-template-columns defines the columns of a grid container."
        },
        {
          question: "Which unit is relative to the viewport width?",
          options: [
            "em",
            "rem",
            "vw",
            "px"
          ],
          correct: 2,
          explanation: "vw (viewport width) is a unit that's relative to 1% of the viewport's width."
        }
      ]
    }
  };

  const startQuiz = (quizKey) => {
    setCurrentQuiz(quizKey);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizzes?.[currentQuiz]?.questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate score
      const correctAnswers = newAnswers?.reduce((acc, answer, index) => {
        return acc + (answer === quizzes?.[currentQuiz]?.questions?.[index]?.correct ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'Excellent! You have strong knowledge in this area.';
    if (percentage >= 60) return 'Good job! Consider reviewing some concepts.';
    return 'Keep learning! Practice makes perfect.';
  };

  if (!currentQuiz) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Icon name="Brain" size={32} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Skill Assessment
          </h3>
          <p className="text-muted-foreground">
            Test your knowledge with interactive quizzes and get instant feedback
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(quizzes)?.map(([key, quiz]) => (
            <motion.div
              key={key}
              whileHover={{ y: -4 }}
              className="bg-background border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => startQuiz(key)}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4`}>
                  <Icon name={quiz?.icon} size={24} className={quiz?.color} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {quiz?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {quiz?.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{quiz?.questions?.length} questions</span>
                  <span>•</span>
                  <span>~{quiz?.questions?.length * 2} min</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const quiz = quizzes?.[currentQuiz];
    const percentage = Math.round((score / quiz?.questions?.length) * 100);

    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              percentage >= 80 ? 'bg-success/10' : percentage >= 60 ? 'bg-warning/10' : 'bg-destructive/10'
            }`}
          >
            <span className={`text-3xl font-bold ${getScoreColor(score, quiz?.questions?.length)}`}>
              {percentage}%
            </span>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quiz Complete!
          </h3>
          <p className="text-muted-foreground mb-4">
            {getScoreMessage(score, quiz?.questions?.length)}
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{score}</div>
              <div className="text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{quiz?.questions?.length - score}</div>
              <div className="text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{quiz?.questions?.length}</div>
              <div className="text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => startQuiz(currentQuiz)}
          >
            Retake Quiz
          </Button>
          <Button
            variant="default"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={resetQuiz}
          >
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  const quiz = quizzes?.[currentQuiz];
  const question = quiz?.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz?.questions?.length) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={resetQuiz}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {quiz?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz?.questions?.length}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Progress</div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-foreground mb-6">
              {question?.question}
            </h4>
            
            <div className="space-y-3">
              {question?.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              iconName="ArrowRight"
              iconPosition="right"
              disabled={selectedAnswer === null}
              onClick={nextQuestion}
            >
              {currentQuestion === quiz?.questions?.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillAssessment;