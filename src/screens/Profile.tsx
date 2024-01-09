import { Center, ScrollView, VStack, Skeleton, useSafeArea, Text, Heading } from 'native-base';
import { ScreenHeader } from '../components/ScreenHeader';
import { UserPhoto } from '../components/UserPhoto';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import * as ImagePiker  from 'expo-image-picker';

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(true);
  const [userPhoto, setUserPhoto] = useState<string>('https://github.com/willianmartins2018.png');

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(false);
    try{  
      const photoSelected = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true,
      });
  
      if (photoSelected.canceled) {
        return;
      }
  
      setUserPhoto(photoSelected.assets[0].uri);
    
    } catch(error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(true);
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
        <Center mt={6} px={10}>
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
            startColor="gray.400"
            endColor="gray.600"
            isLoaded={photoIsLoading}
          />
          {photoIsLoading && <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do Usuário"
            size={PHOTO_SIZE}
          />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            bg="gray.600"
            placeholder="Email"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha Antiga"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Nova Senha"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Confirme a Nova Senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
            mb={20}
          
          />
        
        </VStack>

      </ScrollView>
    </VStack>
  );
}