import React, { useState, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Header, Input, Button, Overlay, Text } from 'react-native-elements'
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'

import * as yup from 'yup'
import { useFormik } from 'formik'

import Container from '@/components/Container'
import { getLoggedInUser } from '@/store/actions'

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 400,
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

const ProfileEdit = () => {
  const { state, goBack } = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState({
    name: '',
    address: '',
    email: '',
    password: ''
  })

  useFocusEffect(useCallback(() => {
    const f = async () => {
      setIsLoading(true)
      const { state } = await getLoggedInUser()
      const { name, address, email, device_id } = state
      setValues({
        name,
        address,
        email,
        password: ''
      })
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
    submitForm
  } = useFormik({
    initialValues: {
      name: '',
      address: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string()
        .max(255, '名前は255文字以内である必要があります')
        .required('有効な名前を入力してください'),
      address: yup.string()
        .max(255, '住所は255文字以内である必要があります')
        .required('有効な住所を入力してください'),
      email: yup.string()
        .email('有効なメールアドレスを入力してください')
        .required('有効なメールアドレスを入力してください'),
      password: yup.string()
        .min(6, 'パスワードは6文字以上である必要があります')
        .required('有効なパスワードを入力してください'),
      device_id: yup.string()
        .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'デバイスIDはxxxx-xxxx-xxxx-xxxxの形式である必要があります')
        .required('有効なデバイスIDを入力してください')
    }),
    onSubmit: async ({
      name,
      address,
      email,
      password
    }, { setErrors }) => {
      // const payload = await register(name, address, email, password, device_id)
      // const joinedErrorOrEmpty = (errors?: string[]) => {
      //   if (!errors) return ''
      //   return errors.join('\n').trim()
      // }
      // if (Object.keys(payload.errors).length >= 1) {
      //   console.log('422', payload.errors)
      //   setErrors({
      //     name: joinedErrorOrEmpty(payload.errors['name']),
      //     address: joinedErrorOrEmpty(payload.errors['address']),
      //     email: joinedErrorOrEmpty(payload.errors['email']),
      //     password: joinedErrorOrEmpty(payload.errors['password']),
      //     device_id: joinedErrorOrEmpty(payload.errors['device_id'])
      //   })
      //   return
      // }
      // if (payload.state === null) {
      //   setIsModalVisible(true)
      //   return
      // }
      // navigate('AfterLogin')
    }
  })

  return (
    <>
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
              placeholder='パスワード'
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
        <Overlay
          isVisible={isModalVisible}
          width='80%'
          height={150}
          animated={true}
          animationType='fade'
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeadingText}>通信エラー</Text>
            <Text>ユーザ情報更新に失敗しました</Text>
            <Button
              title='OK'
              containerStyle={styles.modalButtonContainer}
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </Overlay>
      </Container>
    </>
  )
}

export default ProfileEdit
