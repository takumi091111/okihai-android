import React from 'react'
import { ListItem } from 'react-native-elements'

import { Employee } from '@/interfaces/Employee'

enum ICON_NAME {
  ADMIN = 'user-check',
  NOT_ADMIN = 'user'
}

interface Props {
  emp: Employee
  onPress: (emp: Employee) => void
}

const SearchListItem = ({ emp, onPress }: Props) => {
  const chevronStyle = {
    color: '#8e8e93',
    size: 30
  }

  const iconName = emp.is_admin ? ICON_NAME.ADMIN : ICON_NAME.NOT_ADMIN
  const title = [emp.id, emp.name].join('. ')
  const subtitle = emp.email

  return (
    <ListItem
      leftIcon={{
        type: 'feather',
        name: iconName
      }}
      title={title}
      subtitle={subtitle}
      chevron={chevronStyle}
      bottomDivider={true}
      onPress={() => onPress(emp)}
    />
  )
}

export default SearchListItem
