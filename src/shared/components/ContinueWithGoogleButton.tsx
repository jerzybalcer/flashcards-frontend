import { IconGoogleColored } from '@/assets/icons/IconGoogleColored';
import { Button } from '@chakra-ui/react';

interface Props {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export const ContinueWithGoogleButton: React.FC<Props> = ({ onClick, isLoading, isDisabled }) => {
  return (
    <Button
      w='100%' py={6} mt={2}
      fontSize='lg'
      borderRadius='xl'
      variant='unstyled'
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid'
      borderColor='#747775'
      bg='#FFFFFF'
      color='#1F1F1F'
      _hover={{ bg: '#F2F2F2' }}
      _active={{ bg: '#E8E8E8' }}
      onClick={onClick}
      leftIcon={<IconGoogleColored width='20px' height='20px' />}
      iconSpacing='12px'
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      Continue with Google
    </Button>
  );
}