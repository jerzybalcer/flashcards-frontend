import { NewDeck } from "@/model/NewDeck";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { addDeck } from "@/shared/services/DeckService";
import { successToast } from "@/shared/utils/toasts";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";


export function useAddDeck(onFormClose: () => void) {
    const { isFetching: languagesLoading, data: languages } = useLanguages();

    const [name, setName] = useState<string>('');
    const [languageId, setLanguageId] = useState<string>('');

    const queryClient = useQueryClient();

    const handleSuccess = (toastTitle: string, toastDescription: string) => {
        successToast(toastTitle, toastDescription);
        handleClose();
        queryClient.invalidateQueries(QueryKeys.allDecks);
    };

    const deckMutation = useMutation((deck: NewDeck) => addDeck(deck), 
    {
        onSuccess: () => handleSuccess('Succesfully saved deck', name),
    });

    const handleClose = () => {
        setName('');
        setLanguageId('');
        onFormClose();
    }

    const handleSave = () => {
        const newDeck: NewDeck = {
            name: name,
            languageId: languageId
        };

        deckMutation.mutate(newDeck);
    }

    return { languagesLoading, languages, name, setName, languageId, setLanguageId, handleClose, handleSave }
}