import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const successToast = (title: string, description: string) => {
    toast({
        title: title,
        description: description,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
    });
};

export const errorToast = (description: string) => {
    toast({
        title: 'Error',
        description: description,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
    });
};

export const infoToast = (title: string, description: string) => {
    toast({
        title: title,
        description: description,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top'
    });
};

export const warningToast = (description: string) => {
    toast({
        title: 'Warning',
        description: description,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top'
    });
};