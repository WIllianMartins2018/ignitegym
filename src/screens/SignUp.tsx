import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BackgroundImg from '../assets/background.png';

import LogoImg from '../assets/logo.png';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = yup.object({
  name : yup.string().required('Informe o Nome.'),
  email: yup.string().required('Informe o Email.').email('Email Inválido.'),
  password: yup.string().required('Informe a Senha').min(6, "Senha Deve Ter Pelo Menos 6 dígitos."),
  confirmPassword: yup.string().required('Confirme a Senha.').oneOf([yup.ref('password')], 'Confirmação da senha não confere'),
});

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSingUP(data: FormDataProps) {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
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
            Crie Sua Conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPassword?.message}
                onSubmitEditing={handleSubmit(handleSingUP)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e Acessar"
            onPress={handleSubmit(handleSingUP)}
          />

        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />


      </VStack>
    </ScrollView>
  );
}