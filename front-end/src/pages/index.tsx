import { Avatar, Button, Checkbox, Divider, Flex, HStack, Input, InputGroup, InputLeftElement, Link, Stack, Text } from "@chakra-ui/react" 
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";


export default function Login() { 
    return (
        <Flex 
            w="100vw"
            h="100vh" 
            align="center" 
            justify="center"
        >

            <Flex 
                as="form" 
                width="100%" 
                maxWidth={1050} 
                bg="white" 
                p="8" 
                borderRadius={50} 
                flexDir="column"
            >
                <Flex>
                    <Stack spacing='8' w="600" mt="40" ml="20" alignItems="center">
                        <Text fontSize="5xl">
                            BEM VINDO
                        </Text>
                        <Text fontSize="3xl" fontWeight="bold" letterSpacing="tigth">
                            <u>Novo</u> Login
                        </Text>                        
                        <Button boxShadow="dark-lg" type="submit" borderRadius="full" mt="6" colorScheme="green" w='44'>Criar conta</Button>
                    </Stack>

                    <HStack 
                        spacing="4"
                        mx="24"
                        pr="8"
                        py="3"
                        color="gray.50"
                        borderRightWidth={1}
                        borderColor="gray.100"

                    >
                    </HStack>

                    <Stack spacing="8">
                        <Stack alignItems="center">
                            <Avatar
                                boxShadow="dark-lg" 
                                alignItems="center"
                                boxSize="60"
                                objectFit="cover"
                                src="./Img/icons/avatarLogin.png"
                                size="md"
                            />
                        </Stack>
                        
                        <Stack>   
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' fontSize="medium">
                                    <CiUser/>
                                </InputLeftElement>
                                <Input boxShadow="2xl" id="email" name="email" type="email" borderRadius="full" focusBorderColor="blue.400" bgColor="gray.100" variant="filled" _hover={{ bgColor: 'gray.200' }} size="lg" placeholder="E-mail"/>
                            </InputGroup>
                        </Stack>
                        <Stack>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <RiLockPasswordLine />
                                </InputLeftElement>
                                <Input boxShadow="2xl" id="password" name="password" type="password" borderRadius="full" focusBorderColor="blue.400" bgColor="gray.100" variant="filled" _hover={{ bgColor: 'gray.200' }} size="lg" placeholder="Senha"/>
                            </InputGroup>
                        </Stack>
                        <Stack mt="1" align="center" spacing="20" direction='row'>
                            <Checkbox boxShadow="2xl" ml="8">Lembrar</Checkbox>
                            <Link boxShadow="2xl" >
                                Esqueceu senha?
                            </Link>
                        </Stack>
                        <Stack spacing='1'>
                            <Button boxShadow="dark-lg" type="submit"  borderRadius="full" mt="4" colorScheme="blue" w='100%' h="12">Login</Button>
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                </Flex>
            </Flex>
        </Flex>
        
    );
}