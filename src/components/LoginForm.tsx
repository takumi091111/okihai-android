import { useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'

import Row from '@/components/Row'
import { LoginInput } from '@/interfaces/FormInput'
import { loginSchema } from '@/utils/validation'

interface Props {
  onSubmit: (inputValues: LoginInput) => void
}

const LoginForm = ({ onSubmit }: Props) => {
  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit
  })

  return (
    <>
      <Row>
        <Input
          label="メールアドレス"
          leftIcon={{
            type: 'feather',
            name: 'mail'
          }}
          value={values.email}
          errorMessage={errors.email}
          onChangeText={handleChange('email') as any}
          onBlur={handleBlur('email') as any}
          keyboardType="email-address"
        />
      </Row>
      <Row>
        <Input
          label="パスワード"
          leftIcon={{
            type: 'feather',
            name: 'lock'
          }}
          value={values.password}
          errorMessage={errors.password}
          onChangeText={handleChange('password') as any}
          onBlur={handleBlur('password') as any}
          keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
          secureTextEntry
        />
      </Row>
      <Row>
        <Button title="ログイン" loading={isSubmitting} onPress={submitForm} />
      </Row>
    </>
  )
}

export default LoginForm
