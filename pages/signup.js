import Image from "next/image"
import {Logo} from '../components'
import Link from "next/link";
import { Container, Box, Input, Button, Text, FormControl, FormLabel, FormHelperText, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from 'yup';
import firebase from "../config/firebase"
import axios from "axios";

let validationSchema = yup.object().shape({
  email: yup.string().email('Email Inválido').required('Você tem que informar um email'),
  password: yup.string().required('Por favor informe sua senha'),
  username: yup.string().required('Digite seu Hub')
})
export default function Home() {
  const {values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
    onSubmit: async (values, form) => {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        // const {data} = await axios({
        //   method: 'POST',
        //   url: '/api/profile',
        //   data: {
        //     username: values.username
        //   },
        //   header:{
        //     'Authentication':`Bearer ${user.getToken()}`
        //   }
        // })
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
        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children='clocker.work/' />
            <Input type='text' value={values.username} onChange={handleChange} onBlur={handleBlur}/>
          </InputGroup>
          {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
        </FormControl>
        <Box p={4}>
          <Button colorScheme="purple" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Cadastrar</Button>
        </Box>
      </Box>
      <Link href="/">Já está cadastrado? acesse aqui</Link>
    </Container>
  )
}
