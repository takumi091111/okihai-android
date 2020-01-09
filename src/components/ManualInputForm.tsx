import { useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'

import Row from '@/components/Row'
import { manualInputSchema } from '@/utils/validation'

export interface InputValue {
  device_id: string
}

interface Props {
  onSubmit: (values: InputValue) => void
}

const ManualInputForm = ({ onSubmit }: Props) => {
  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    submitForm
  } = useFormik({
    initialValues: {
      device_id: ''
    },
    validationSchema: manualInputSchema,
    onSubmit
  })

  return (
    <>
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
        <Button title="確定" loading={isSubmitting} onPress={submitForm} />
      </Row>
    </>
  )
}

export default ManualInputForm
