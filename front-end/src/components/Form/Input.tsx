import { FormControl, FormLabel, Input as ChakraInput, InputProps } from "@chakra-ui/react";

interface IInputProps extends InputProps {
    name: string;
    label?: string;
}

export function Input({name, label, ...rest }: IInputProps){
    return(
        <FormControl>
            { !!label && <FormLabel htmlFor="{name}">{label}</FormLabel>}
            <ChakraInput 
                id="{name}"
                name="{name}"
                borderRadius="full"
                focusBorderColor="blue.400" 
                bgColor="gray.200" 
                variant="filled"
                _hover={{
                    bgColor: 'gray.200'
                }}
                size="lg"
                {...rest}
            />
        </FormControl>
    );
}