// src/pages/quiz/QuizPage.js

import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import QuizList from './QuizList';

// Dummy data for quizzes
const dummyQuizzes = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: JSON.stringify(["Paris", "London", "Rome", "Berlin"]),
    correctAnswer: "Paris"
  },
  {
    id: 2,
    questionText: "Which planet is known as the Red Planet?",
    options: JSON.stringify(["Earth", "Mars", "Jupiter", "Saturn"]),
    correctAnswer: "Mars"
  },
  {
    id: 3,
    questionText: "What is the chemical symbol for water?",
    options: JSON.stringify(["O2", "H2O", "CO2", "NaCl"]),
    correctAnswer: "H2O"
  }
];

const QuizPage = () => {

//     const [quizzes, setQuizzes] = useState([]);
//   const { moduleId } = useParams(); // Assuming moduleId is passed as a route parameter

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(`/api/v1/quizzes/module/${moduleId}`);
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };

//     fetchQuizzes();
//   }, [moduleId]);

  return (
    <PageContainer title="Quizzes" description="List of quizzes for the selected module">
      <QuizList quizzes={dummyQuizzes} />
    </PageContainer>
  );
};

export default QuizPage;
