import { Box } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
    children: JSX.Element;
}

export const Draggable: React.FC<DraggableProps> = ({ children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `flashcard-${children.key}`,
    });

    const style = transform ? 
    {
        transform: `translateX(${transform.x}px)`,
    }
    : undefined;

    return <Box ref={setNodeRef} style={style} {...listeners} {...attributes} w='100%' h='100%'>
        {children}
    </Box>
}