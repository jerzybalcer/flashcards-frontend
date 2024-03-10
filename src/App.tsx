import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MyFlashCardsPage } from './pages/MyFlashCardsPage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';

export const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Navigate to='/cards' />} />
          <Route path='/cards' element={<MyFlashCardsPage />} />
          <Route path='/learn' element={<LearnPage></LearnPage>} />
          <Route path='/quiz' element={<QuizPage></QuizPage>} />
        </Routes>
    </>
  )
}