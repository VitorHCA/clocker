import Image from "next/image"
import {Logo} from '../Logo'
import Link from "next/link";
import { Container, Box, Input, Button, Text, FormControl, FormLabel, FormHelperText} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from 'yup';
import firebase, {persistenceMode} from "./../../config/firebase"
import { useEffect } from "react";

let validationSchema = yup.object().shape({
  email: yup.string().email('Email Inválido').required('Você tem que informar um email'),
  password: yup.string().required('Por favor informe sua senha'),
  username: yup.string().required('Digite seu Hub')
})
export const Login = () => {
  const {values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
    onSubmit: async (values, form) => {
      try {
        firebase.auth().setPersistence(persistenceMode)
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch (error) {
        console.log('Erro =>', error)
      }      
    },
    validationSchema,
    initialValues:{
      email:'',
      username:'',
      password:''
    }
  })
  useEffect(()=>{
    console.log('sessao ativa?',firebase.auth().currentUser)
  },[])
  return (
    <Container centerContent p={4}>
      <Image
        src={Logo}
        alt="Clocker Logo"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <Box p={4} mt={8}>
        <Text>Crie sua Agenda Compartilhada</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}></Input>
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>
        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}></Input>
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>
        <Box p={4}>
          <Button colorScheme="purple" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>        
      </Box>
      <Link href="/signup">Não possui conta? Cadastre-se</Link>
    </Container>
  )
}
