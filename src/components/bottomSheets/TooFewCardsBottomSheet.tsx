import { Center, Flex, Text, useTheme } from "@chakra-ui/react";
import { BottomSheet } from "./BottomSheet";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const TooFewCardsBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
    const blue200 = useTheme().colors.blue[200];

    function getHeader() {
        return <Center w='100%'>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 80 60" fill="none">
                <path d="M35 43.43V49.48C34.9987 50.8114 34.469 52.0879 33.5273 53.0291C32.5856 53.9703 31.3089 54.4993 29.9775 54.5H10.025C8.69272 54.5 7.41497 53.9709 6.47267 53.0291C5.53037 52.0873 5.00066 50.8098 5 49.4775V29.525C5 28.1927 5.52907 26.915 6.4709 25.9727C7.41273 25.0304 8.69022 24.5007 10.0225 24.5H17.4075" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M45.8856 13.828L50.1636 9.55003C51.106 8.60951 52.3831 8.08144 53.7145 8.08177C55.0459 8.08211 56.3228 8.61081 57.2647 9.5518L71.3732 23.6603C72.3153 24.6024 72.8447 25.88 72.845 27.2123C72.8454 28.5446 72.3166 29.8225 71.375 30.765L57.2665 44.8735C56.3244 45.8156 55.0468 46.345 53.7145 46.3453C52.3822 46.3457 51.1043 45.8169 50.1618 44.8753L44.9398 39.6533" stroke={blue200} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.4175 13.2779C20.7685 11.9735 21.6226 10.8616 22.7925 10.1862C23.9623 9.51077 25.3523 9.32709 26.6575 9.67543L46.2225 14.9179C47.5269 15.2689 48.6389 16.123 49.3143 17.2929C49.9896 18.4627 50.1733 19.8528 49.825 21.1579L44.5825 40.7229C44.2315 42.0274 43.3774 43.1393 42.2075 43.8147C41.0377 44.4901 39.6476 44.6738 38.3425 44.3254L18.775 39.0829C17.4706 38.732 16.3586 37.8778 15.6832 36.708C15.0078 35.5381 14.8242 34.1481 15.1725 32.8429L20.4175 13.2779Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Center>;
    }

    function getBody() {
        return <Flex direction='column' justify='space-between' align='center' gap='28px' mb={8}>
            <Flex direction='column' justify='space-between' align='center' gap='10px' textAlign='center'>
                <Text display='inline-block' lineHeight='100%' fontSize={32} fontWeight={700} userSelect='text'>Too few flashcards</Text>
                <Text display='inline-block' lineHeight='100%' fontSize={24} fontWeight={700} userSelect='text' color='blue.200'>Add at least 10 to start quizzing</Text>
            </Flex>
        </Flex>;
    }

    return <BottomSheet isOpen={isOpen} header={[getHeader()]} body={[getBody()]} confirmText="Close" onConfirm={onClose} onClose={onClose} closeButtonVisible={false}  />
}