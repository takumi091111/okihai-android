import { useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Button, CheckBox, Input } from 'react-native-elements'

import Row from '@/components/Row'
import { Employee } from '@/interfaces/Employee'
import { UpdateInput } from '@/interfaces/FormInput'
import { User } from '@/interfaces/User'
import { COLOR } from '@/utils/theme/colors'
import { profileEditSchema } from '@/utils/validation'

interface Props<T = User | Employee> {
  user?: User
  emp?: Employee
  editable?: boolean
  onSubmit: (
    inputValues: UpdateInput<T>,
    setErrors: (errors: any) => void
  ) => void
}

export const UserProfileForm = ({ user, editable, onSubmit }: Props<User>) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    submitForm,
    setErrors
  } = useFormik({
    initialValues: {
      name: user.name,
      address: user.address,
      email: user.email,
      password: ''
    },
    validationSchema: profileEditSchema.user,
    onSubmit: async inputValues => onSubmit(inputValues, setErrors)
  })

  return (
    <>
      <Row>
        <Input
          label="ユーザID"
          leftIcon={{
            type: 'feather',
            name: 'tag'
          }}
          value={user.id.toString()}
          disabled={true}
        />
      </Row>
      <Row>
        <Input
          label="名前"
          leftIcon={{
            type: 'feather',
            name: 'user'
          }}
          value={values.name}
          errorMessage={editable ? errors.name : ''}
          onChangeText={handleChange('name') as any}
          onBlur={handleBlur('name') as any}
          keyboardType="default"
          disabled={!editable}
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
          errorMessage={editable ? errors.address : ''}
          onChangeText={handleChange('address') as any}
          onBlur={handleBlur('address') as any}
          keyboardType="default"
          disabled={!editable}
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
          errorMessage={editable ? errors.email : ''}
          onChangeText={handleChange('email') as any}
          onBlur={handleBlur('email') as any}
          keyboardType="email-address"
          disabled={!editable}
        />
      </Row>
      {editable ? (
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
      ) : null}
      <Row>
        <Input
          label="置き配ボックスID"
          leftIcon={{
            type: 'feather',
            name: 'box'
          }}
          value={user.device_id}
          keyboardType={
            Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'
          }
          disabled={true}
        />
      </Row>
      {editable ? (
        <Row>
          <Button title="確定" loading={isSubmitting} onPress={submitForm} />
        </Row>
      ) : null}
    </>
  )
}

export const EmployeeProfileForm = ({
  emp,
  editable,
  onSubmit
}: Props<Employee>) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    submitForm,
    setErrors
  } = useFormik({
    initialValues: {
      name: emp.name,
      email: emp.email,
      password: '',
      is_admin: emp.is_admin
    },
    validationSchema: profileEditSchema.emp,
    onSubmit: async inputValues => onSubmit(inputValues, setErrors)
  })

  const handlePressCheckBox = () => {
    // setFieldValue('is_admin', !values.is_admin)
  }

  return (
    <>
      <Row>
        <Input
          label="従業員ID"
          leftIcon={{
            type: 'feather',
            name: 'tag'
          }}
          value={emp.id.toString()}
          disabled={true}
        />
      </Row>
      <Row>
        <Input
          label="名前"
          leftIcon={{
            type: 'feather',
            name: 'user'
          }}
          value={values.name}
          errorMessage={editable ? errors.name : ''}
          onChangeText={handleChange('name') as any}
          onBlur={handleBlur('name') as any}
          keyboardType="default"
          disabled={!editable}
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
          errorMessage={editable ? errors.email : ''}
          onChangeText={handleChange('email') as any}
          onBlur={handleBlur('email') as any}
          keyboardType="email-address"
          disabled={!editable}
        />
      </Row>
      {editable ? (
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
      ) : null}
      <Row>
        <CheckBox
          title="管理者権限"
          iconType="feather"
          checkedIcon="check-square"
          uncheckedIcon="square"
          checkedColor={COLOR.GREEN}
          uncheckedColor={COLOR.GRAY}
          checked={Boolean(emp.is_admin)}
          onPress={handlePressCheckBox}
        />
      </Row>
      {editable ? (
        <Row>
          <Button title="確定" loading={isSubmitting} onPress={submitForm} />
        </Row>
      ) : null}
    </>
  )
}
