import React, { FunctionComponent } from 'react'
import {LoginProps} from '../types'
import * as Yup from 'yup'
import {SignUpValues} from '../types'
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';;



const SignUpSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  password: Yup.string(),
})

const SignUp:FunctionComponent<LoginProps> = ({gotrue}) => {
  const initialValues: SignUpValues = { 
    name: '',
    email: '',
    password: ''
  };

  return (
    <div>
      <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log({ values, actions });
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <label htmlFor="firstName">First Name</label>
           <Field id="firstName" name="firstName" placeholder="First Name" />
           <button type="submit">Submit</button>
         </Form>
       </Formik>

    </div>
  )
}

export default SignUp