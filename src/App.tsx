import { Navigate, Route, Routes } from 'react-router-dom';
import { DeckPage } from './pages/DeckPage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { AllDecksPage } from './pages/AllDecksPage';
import { Box, Flex } from '@chakra-ui/react';
import { QuizContextProvider } from './features/Quiz/context/QuizContext';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { ProtectedRoute } from '@/shared/components/routes/ProtectedRoute';
import { OnboardingGuard } from '@/shared/components/routes/OnboardingGuard';
import { OnboardingRoute } from '@/shared/components/routes/OnboardingRoute';


export const App = () => {
  return (
    <Flex justify='center' h='100%' w='100%' p={0}>
        <Box maxW='1200px' w='100%' p={4}> 
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/onboarding' element={<OnboardingRoute />} />
              <Route element={<OnboardingGuard />}>
                <Route path='/' element={<Navigate to='/dashboard' />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/decks' element={<AllDecksPage />} />
                <Route path='/decks/:deckId' element={<DeckPage />} />
                <Route path='/decks/:deckId/learn' element={<LearnPage />} />
                <Route path='/decks/:deckId/quiz' element={<QuizContextProvider><QuizPage /></QuizContextProvider>} />
                <Route path='/decks/:deckId/quiz/daily' element={<QuizContextProvider><QuizPage useDailyCards/></QuizContextProvider>} />
              </Route>
            </Route>
          </Routes>
        </Box>
    </Flex>
  )
}