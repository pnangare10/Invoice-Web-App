import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  "email" : yup.string().required("Please enter your username or email"),
  "password" : yup.string().min(6).required("Please enter your password"),
})
