import { InputProps, InputGroup, Input, InputRightElement, IconButton, forwardRef } from "@chakra-ui/react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { useState } from "react"

export const PasswordInput = forwardRef<InputProps, 'input'>((props, ref) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        ref={ref}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement width='4.5rem'>
        <IconButton
          size='sm'
          variant='ghost'
          aria-label="toggle-password-visibility"
          icon={show ? <IconEyeOff /> : <IconEye />}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  )
})