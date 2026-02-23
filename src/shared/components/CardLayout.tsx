import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"

interface Props {
  header?: JSX.Element[];
  body?: JSX.Element[];
  footer?: JSX.Element[];
}

export const CardLayout: React.FC<Props> = ({ header, body, footer }) => {
  return (
    <Card borderRadius='xl'>
        {header && 
            <CardHeader paddingX={6} paddingY={4}>
                {...header}
            </CardHeader>
        }
        {body && 
            <CardBody paddingX={6} paddingY={2}>
                {...body}
            </CardBody>
        }
        {footer && 
            <CardFooter display='flex' flexDir='column' gap={6} paddingX={6} paddingY={4}>
                {...footer}
            </CardFooter>
        }
    </Card>
  )
}