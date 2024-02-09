import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, IconButton, Image, SimpleGrid, Stack, Text, Wrap, WrapItem,} from "@chakra-ui/react";
import { GrUserAdd, GrFormView } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Dashboard(){
    return (
        <Flex direction="column" h="100vh">
            <Header/>

            <Flex w="100%" my="8" maxWidth={1480} mx="auto" px="4">
                <Sidebar/>

                <Flex>
                    <SimpleGrid
                        columns={{ sm: 1, md: 4}}
                        spacing='4'
                        p='10'
                        w="100%"
                        textAlign='center'
                        >
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>

                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                        <Card boxShadow="dark-lg" maxW="md" h="96">
                            <CardHeader>
                                <Flex>
                                    <Flex flex="1" gap="4" alignItems="center">
                                        <Avatar name="avatar" src="./Img/icons/empresaTeste.jpg"/>
                                        <Box>
                                            <Heading size="sm">
                                                <Text fontSize="14">
                                                    Empresa Teste
                                                </Text>
                                            </Heading>
                                            <Text fontSize="12">Criador Teste, Teste</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                    />
                                </Flex>
                            </CardHeader>
                            <CardBody whiteSpace="1" h="10">
                                <Text textAlign="justify" fontSize="12" noOfLines={4}>
                                    Buscamos uma(um) assistente administrativo responsável por fornecer suporte
                                    a nossos gerentes e funcionários, auxiliar nas necessidades diárias de escritório e 
                                    gerenciar as atividades administrativas gerais de nossa empresa.
                                </Text>
                                <Image
                                    mt="2"
                                    maxH="24"
                                    maxW="40"
                                    boxSize='150px'
                                    objectFit='cover'
                                    alignItems="center"                                
                                    src="./Img/icons/bannerVaga.png"
                                />
                            </CardBody>
                            
                            <CardFooter
                                alignItems="center"
                            >
                                <Wrap spacing={1} alignItems="center">
                                    <WrapItem>
                                        <Button variant="ghost" leftIcon={<GrUserAdd color="green"/>} size='xs'>Concorrer</Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button variant="ghost"leftIcon={<GrFormView color="blue"/>} size='xs'>Visualizar</Button>
                                    </WrapItem>
                                </Wrap>
                            </CardFooter>
                        </Card>
                    </SimpleGrid>
                </Flex> 
            </Flex>
        </Flex>
    );
}