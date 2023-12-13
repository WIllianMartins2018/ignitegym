import { VStack, Image, Text, Center, Heading } from 'native-base';
import BackgroundImg from '../assets/background.png';

import LogoImg from '../assets/logo.png';

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <Image
          source={LogoImg}
          alt="Logo"
        />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>

      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse Sua Conta
        </Heading>
      </Center>
      
    </VStack>
  );
}