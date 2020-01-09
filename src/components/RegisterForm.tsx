import { useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'

import Row from '@/components/Row'
import { Employee } from '@/interfaces/Employee'
import { RegisterInput } from '@/interfaces/FormInput'
import { User } from '@/interfaces/User'
import { registerSchema } from '@/utils/validation'

interface Props<T> {
  onSubmit: (
    inputValues: RegisterInput<T>,
    setErrors: (errors: any) => void
  ) => void
}

export const UserRegisterForm = ({ onSubmit }: Props<User>) => {
  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm,
    setErrors
  } = useFormik({
    initialValues: {
      name: '',
      address: '',
      email: '',
      password: '',
      device_id: ''
    },
    validationSchema: registerSchema.user,
    onSubmit: inputValues => onSubmit(inputValues, setErrors)
  })

  return (
    <>
      <Row>
        <Input
          label="名前"
          leftIcon={{
            type: 'feather',
            name: 'user'
          }}
          value={values.name}
          errorMessage={errors.name}
          onChangeText={handleChange('name') as any}
          onBlur={handleBlur('name') as any}
          keyboardType="default"
        />
      </Row>
      <Row>
        <Input
          label="住所"
          leftIcon={{
            type: 'feather',
            name: 'home'
          }}
          value={values.address}
          errorMessage={errors.address}
          onChangeText={handleChange('address') as any}
          onBlur={handleBlur('address') as any}
          keyboardType="default"
        />
      </Row>
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
        <Input
          label="置き配ボックスID"
          leftIcon={{
            type: 'feather',
            name: 'box'
          }}
          value={values.device_id}
          errorMessage={errors.device_id}
          onChangeText={handleChange('device_id') as any}
          onBlur={handleBlur('device_id') as any}
          keyboardType={
            Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'
          }
        />
      </Row>
      <Row>
        <Button title="登録" loading={isSubmitting} onPress={submitForm} />
      </Row>
    </>
  )
}

export const EmployeeRegisterForm = ({ onSubmit }: Props<Employee>) => {
  // const handlePressCheckBox = () => {
  //   setFieldValue('is_admin', !values.is_admin)
  // }

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm,
    setErrors
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      is_admin: false
    },
    validationSchema: registerSchema.emp,
    onSubmit: inputValues => onSubmit(inputValues, setErrors)
  })

  return (
    <>
      <Row>
        <Input
          label="名前"
          leftIcon={{
            type: 'feather',
            name: 'user'
          }}
          value={values.name}
          errorMessage={errors.name}
          onChangeText={handleChange('name') as any}
          onBlur={handleBlur('name') as any}
          keyboardType="default"
        />
      </Row>
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
      {/* <Row>
        <CheckBox
          title="管理者権限"
          iconType="feather"
          checkedIcon="check-square"
          uncheckedIcon="square"
          checkedColor={COLOR.GREEN}
          uncheckedColor={COLOR.GRAY}
          checked={values.is_admin}
          onPress={handlePressCheckBox}
        />
      </Row> */}
      <Row>
        <Button title="登録" loading={isSubmitting} onPress={submitForm} />
      </Row>
    </>
  )
}
