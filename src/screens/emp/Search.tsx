import React, { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import Empty from '@/components/Empty'
import Error from '@/components/Error'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import SearchListItem from '@/components/SearchListItem'
import { Employee } from '@/interfaces/Employee'
import { search } from '@/utils/api/emp'

const Search = () => {
  const title: string = useNavigationParam('title')
  const { goBack, navigate } = useNavigation()
  const [query, setQuery] = useState('')
  const [empList, setEmpList] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const isEmpty = useMemo(() => empList.length <= 0, [empList])

  const scrollViewStyle = useMemo(() => {
    if (isLoading || isError || isEmpty) {
      return {
        flex: 1
      }
    }
    return null
  }, [isLoading, isError, isEmpty])

  const handlePressBack = () => goBack()

  const handlePressListItem = (emp: Employee) => navigate('Edit', { emp })

  const fetchSearchResult = async () => {
    setIsError(false)
    setIsLoading(true)

    const result = await search(query)
    if (result.ok === false) {
      setIsError(true)
      navigate('Error')
      return false
    }

    setEmpList(result.data)
    setIsLoading(false)
  }

  return (
    <>
      <Header title={title} onPressBack={handlePressBack} />
      <SearchBar
        lightTheme={true}
        placeholder="従業員IDまたは名前を入力"
        value={query}
        onChangeText={text => setQuery(text)}
        onEndEditing={fetchSearchResult}
        onSubmitEditing={fetchSearchResult}
      />
      <ScrollView contentContainerStyle={scrollViewStyle}>
        {isError ? (
          <Error
            active={isError}
            text="検索結果の取得に失敗しました"
            onRetry={fetchSearchResult}
          />
        ) : isLoading ? (
          <Loading active={isLoading} text="検索中..." />
        ) : isEmpty ? (
          <Empty active={isEmpty} text="検索結果が0件です" />
        ) : (
          empList.map(emp => (
            <SearchListItem
              key={emp.id}
              emp={emp}
              onPress={handlePressListItem}
            />
          ))
        )}
      </ScrollView>
    </>
  )
}

export default Search
