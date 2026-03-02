import { Select, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react"
import { Language } from "@/model/Language"
import { IconChevronDown } from "@tabler/icons-react";

interface Props {
    languages: Language[];
    isLoading: boolean;
    value?: Language;
    onChange: (language?: Language) => void;
}

export const LanguageInput: React.FC<Props> = ({ languages, isLoading, value, onChange }) => {
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const languageId = event.currentTarget.value;
        const language = languages.find(l => l.id === languageId);
        onChange(language);
    }

    return (
        <InputGroup>
            <Select
                isDisabled={isLoading}
                placeholder={isLoading ? "Loading languages..." : "Select language"}
                value={value?.id}
                onChange={handleChange}
                icon={isLoading ? <></> : <IconChevronDown />}
            >
                {languages.map(language =>
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                )}
            </Select>
            {isLoading && (
                <InputRightElement>
                    <Spinner size="sm" color="gray.400" />
                </InputRightElement>
            )}
        </InputGroup>
    );
}