import React from 'react'
import { ListItem } from 'react-native-elements'
import { NavigationContainerProps, withNavigation } from 'react-navigation'
import Container from '@/components/Container'
import Header from '@/components/Header'

import { DateTimeFormat } from 'intl'
import 'intl/locale-data/jsonp/ja'

import { DeliverItem } from '@/interfaces/DeliverItem'
import { DELIVER_ITEM_STATUS } from '@/interfaces/DeliverItemStatus'

const items: DeliverItem[] = [
  {
    id: 'AAA',
    status: DELIVER_ITEM_STATUS.UNDELIVERED
  },
  {

    id: 'BBB',
    status: DELIVER_ITEM_STATUS.UNRECIEVED
  },
  {
    id: 'CCC',
    status: DELIVER_ITEM_STATUS.NONE
  }
]

const statusText = {
  [DELIVER_ITEM_STATUS.UNDELIVERED]: '未配達',
  [DELIVER_ITEM_STATUS.UNRECIEVED]: '未受領',
  [DELIVER_ITEM_STATUS.NONE]: '受領済み'
}

const statusIcon = {
  [DELIVER_ITEM_STATUS.UNDELIVERED]: 'lock',
  [DELIVER_ITEM_STATUS.UNRECIEVED]: 'unlock',
  [DELIVER_ITEM_STATUS.NONE]: 'check'
}

const Home = ({ navigation }: NavigationContainerProps) => {
  return (
    <>
      <Header
        text={navigation.state.params.title}
        onMenuButtonPress={() => navigation.toggleDrawer()}
      />
      <Container>
        { items.map((item, i) => (
          <ListItem key={i}
            leftIcon={{
              type: 'feather',
              name: statusIcon[item.status]
            }}
            title={statusText[item.status]}
            subtitle={DateTimeFormat('ja-JP').format(new Date)}
            bottomDivider={true}
            onPress={() => navigation.navigate('Lock')}
          />
        )) }
      </Container>
    </>
  )
}

export default withNavigation(Home)