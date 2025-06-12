import { useState } from "react";
import { Select } from "@chakra-ui/react"
import { Language } from "@/model/Language"

interface Props {
    languages: Language[];
    isLoading: boolean;
    onChange: (language?: Language) => void;
}

export const LanguageInput: React.FC<Props> = ({ languages, isLoading, onChange }) => {
    const [languageId, setLanguageId] = useState<string | undefined>();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const languageId = event.currentTarget.value;
        const language = languages.find(l => l.id === languageId);

        setLanguageId(languageId);
        onChange(language);
    }

    return <Select 
                isDisabled={isLoading} 
                placeholder="Select language" 
                value={languageId} 
                onChange={handleChange}
            >
            {languages.map(language => 
                <option key={language.id} value={language.id}>
                    {language.name}
                </option>
            )}
            </Select>
} 