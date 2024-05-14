import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { DeckPage } from './pages/DeckPage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { AllDecksPage } from './pages/AllDecksPage';
import { Box } from '@chakra-ui/react';

export const App = () => {
  window.addEventListener("load",function() {
    setTimeout(function(){
        document.querySelector('html')?.requestFullscreen();
    }, 0);
  })

  return (
    <Box p={4} h='100%' w='100%'>
        <Routes>
          <Route path='/' element={<Navigate to='/decks' />} />
          <Route path='/decks' element={<AllDecksPage />} />
          <Route path='/decks/:deckId' element={<DeckPage />} />
          <Route path='/learn' element={<LearnPage></LearnPage>} />
          <Route path='/quiz' element={<QuizPage></QuizPage>} />
        </Routes>
    </Box>
  )
}