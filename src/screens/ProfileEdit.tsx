import React, { useState, useCallback } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import Toast from 'react-native-root-toast'
import Container from '@/components/Container'
import { useStore } from 'effector-react'
import { store } from '@/store'
import { UpdateUser } from '@/store/events'
import { User } from '@/interfaces/User'

import { useFormik } from 'formik'
import { profileEditSchema } from '@/utils/validation'
import { updateUser } from '@/utils/api'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50
  },
  input: {
    paddingLeft: 15
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: '#00b894'
  },
  buttonTitle: {
    color: 'white'
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalHeadingText: {
    fontSize: 20
  },
  modalButtonContainer: {
    width: '100%'
  }
})

export default () => {
  const { user } = useStore(store)
  const { state, goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [userValues, setUserValues] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  })

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      setUserValues({ ...user })
      setIsLoading(false)
    }
    f()
    return () => null
  }, []))

  const {
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm,
    values
  } = useFormik({
    initialValues: userValues,
    enableReinitialize: true,
    validationSchema: profileEditSchema,
    onSubmit: async ({
      name,
      address,
      email,
      password
    }, { setErrors }) => {
      type ConditionUser = Omit<User, 'id' | 'device_id' | 'created_at' | 'updated_at'>
      type Condition = Record<keyof ConditionUser, boolean>

      // 変更があればtrue, なければfalse
      const condition: Condition = {
        name: name !== userValues.name,
        address: address !== userValues.address,
        email: email !== userValues.email,
        password: password !== userValues.password
      }

      // 変更がない場合は処理を行わない
      const isOK = !Object.values(condition).every(v => v === false)
      if (!isOK) return

      const data: Partial<Omit<User, 'device_id'>> = {}
      if (condition.name) data.name = name
      if (condition.address) data.address = address
      if (condition.email) data.email = email
      if (condition.password) data.password = password

      const result = await updateUser(data)

      if (result.ok === true) {
        UpdateUser({ user: result.data })
        const toast = Toast.show('更新しました')
        setTimeout(() => Toast.hide(toast), 2000)
      } else {
        if (result.statusCode === 422) {
          setErrors({
            name: result.error['name'] || '',
            address: result.error['address'] || '',
            email: result.error['email'] || '',
            password: result.error['password'] || ''
          })
        }
      }
    }
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior='padding'
    >
      <Header
        centerComponent={{
          text: state.params.title
        }}
        leftComponent={{
          type: 'feather',
          icon: 'arrow-left',
          onPress: () => goBack()
        }}
      />
      <Container isCenter={true}>
        { isLoading ? 
          <ActivityIndicator
            size='large'
            color='#000000'
          /> :
          <View style={styles.innerContainer}>
            <Input
              placeholder='名前'
              leftIcon={{
                type: 'feather',
                name: 'user'
              }}
              value={values.name}
              errorMessage={errors.name}
              onChangeText={handleChange('name') as any}
              onBlur={handleBlur('name') as any}
              inputStyle={styles.input}
            />
            <Input
              placeholder='住所'
              leftIcon={{
                type: 'feather',
                name: 'home'
              }}
              value={values.address}
              errorMessage={errors.address}
              onChangeText={handleChange('address') as any}
              onBlur={handleBlur('address') as any}
              inputStyle={styles.input}
            />
            <Input
              placeholder='メールアドレス'
              leftIcon={{
                type: 'feather',
                name: 'mail'
              }}
              value={values.email}
              errorMessage={errors.email}
              onChangeText={handleChange('email') as any}
              onBlur={handleBlur('email') as any}
              inputStyle={styles.input}
            />
            <Input
              secureTextEntry={true}
              placeholder='新しいパスワード'
              leftIcon={{
                type: 'feather',
                name: 'lock'
              }}
              value={values.password}
              errorMessage={errors.password}
              onChangeText={handleChange('password') as any}
              onBlur={handleBlur('password') as any}
              inputStyle={styles.input}
            />
            <Button
              title='更新'
              loading={isSubmitting}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={submitForm}
            />
          </View>
        }
      </Container>
    </KeyboardAvoidingView>
  )
}
