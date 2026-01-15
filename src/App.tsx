import { Navigate, Route, Routes } from 'react-router-dom';
import { DeckPage } from './pages/DeckPage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { AllDecksPage } from './pages/AllDecksPage';
import { Box, Flex } from '@chakra-ui/react';
import { QuizContextProvider } from './features/Quiz/context/QuizContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

export const App = () => {
  return (
    <Flex justify='center' h='100%' w='100%' p={0}>
        <Box maxW='1200px' w='100%' p={4}> 
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Navigate to='/decks' />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/decks' element={<AllDecksPage />} />
              <Route path='/decks/:deckId' element={<DeckPage />} />
              <Route path='/decks/:deckId/learn' element={<LearnPage></LearnPage>} />
              <Route path='/decks/:deckId/quiz' element={<QuizContextProvider><QuizPage /></QuizContextProvider>} />
            </Route>
          </Routes>
        </Box>
    </Flex>
  )
}