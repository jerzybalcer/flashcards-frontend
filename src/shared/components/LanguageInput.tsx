import { useMemo, useRef, useState } from "react";
import { Button, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure, InputGroup, InputRightElement, Center, useTheme } from "@chakra-ui/react"
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { Language } from "@/model/Language"

interface Props {
    languages: Language[];
    isLoading: boolean;
    value?: Language;
    onChange: (language?: Language) => void;
}

export const LanguageInput: React.FC<Props> = ({ languages, isLoading, value, onChange }) => {
    const internalInputRef = useRef<HTMLInputElement>(null);
    const dropdown = useDisclosure();

    const [inputText, setInputText] = useState<string>('');
    
    const blue = useTheme().colors.blue;

    function handleLanguageMouseDown(event: React.MouseEvent<HTMLButtonElement>, language: Language){
        event.preventDefault();

        let newLanguage: Language | undefined = language;

        if(language.name === value?.name){ // uncheck
            newLanguage = undefined;
        }

        if(newLanguage) {
            dropdown.onClose();
        }

        onChange(newLanguage);
        setInputText(newLanguage?.name ?? '');
    }

    function handleInternalInputChange(event: React.ChangeEvent<HTMLInputElement>){
        if(!dropdown.isOpen){
            dropdown.onOpen();
        }
        setInputText(event.currentTarget.value);
    }

    function handleInternalInputBlur(){
        dropdown.onClose();

        if(value && value.name !== inputText)
            setInputText(value.name)
    }

    const filteredLanguages = useMemo(() =>
        languages.filter((lang) =>
            lang.name.toLowerCase().startsWith(inputText.toLowerCase())
        ),
        [languages, inputText]
    );

    return <Popover
            returnFocusOnClose={false}
            isOpen={dropdown.isOpen}
            onClose={dropdown.onClose}
            placement='top'
            closeOnBlur={true}
            initialFocusRef={internalInputRef}
            isLazy
    >
        <PopoverTrigger>
            <InputGroup onClick={dropdown.onOpen}>
                <Input
                    ref={internalInputRef}
                    isDisabled={isLoading}
                    value={inputText}
                    placeholder="Pick or enter language"
                    onChange={handleInternalInputChange}
                    onBlur={handleInternalInputBlur}
                />
                <InputRightElement>
                    <IconChevronDown />
                </InputRightElement>
            </InputGroup>
        </PopoverTrigger>
        <PopoverContent maxH='120px' overflowY='auto' bg='gray.700' style={{ scrollbarWidth: 'none'}} border={dropdown.isOpen ? `solid ${blue[300]} 2px` : ''}>
          <PopoverBody>
            <Flex direction='column'>
                {filteredLanguages.length === 0 && <Center p={2} opacity={0.8}>No matching languages</Center>}

                {filteredLanguages.length > 0 && filteredLanguages.map(lang => 
                    <Button 
                        w='100%' 
                        variant='ghost' 
                        p={2} 
                        key={lang.id} 
                        rightIcon={value?.id === lang.id ? <IconCheck color={blue[200]}/> : undefined} 
                        onMouseDown={(event) => handleLanguageMouseDown(event, lang)}
                    >
                        {lang.name}
                    </Button>
                )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
}