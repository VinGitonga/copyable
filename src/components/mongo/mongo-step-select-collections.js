import {Box, Button, Checkbox, Stack, Text} from '@chakra-ui/react'
import {useState} from 'react'
import {useDatabaseMigrationStore} from 'contexts/useDatabaseMigrationStore'
import {fetchMyDbs} from 'services/save-db-to-profile'

export default function MongoStepSelectCollections({
  collections,
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  const [checkedItems, setCheckedItems] = useState(
    collections?.map(() => false)
  )

  const {
    selectedCollections,
    setSelectedCollections,
    setSinglestoreDatabases,
  } = useDatabaseMigrationStore()

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  // get singlestore dbs for the currently logged in user
  const getDbs = async () => {
    let data = await fetchMyDbs()
    setSinglestoreDatabases(data)
  }

  const onClickNext = async () => {
    let selectedCols = []
    checkedItems.map((item, idx) => {
      if (item) {
        selectedCols.push(collections[idx])
      }
    })
    setSelectedCollections(selectedCols)
    await getDbs()
    handleNextStepClick()
  }

  // @todo: Maybe also show the schema definition to check if the user is happy with it
  return (
    <>
      <Box textAlign={'left'}>
        <Text>
          You are almost there! Please select some collections to be imported
        </Text>
        <br />
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => setCheckedItems(collections?.map(() => !allChecked))}
        >
          Import all collections
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          {collections?.map((collectionName, idx) => {
            return (
              <Checkbox
                key={idx}
                isChecked={checkedItems[idx]}
                onChange={(e) => {
                  checkedItems[idx] = e.target.checked
                  setCheckedItems(
                    checkedItems.map((checkedItem) => checkedItem)
                  )
                }}
              >
                {collectionName}
              </Checkbox>
            )
          })}
        </Stack>
      </Box>
      <Box textAlign={'left'} mt={2}>
        <Button onClick={handlePreviousStepClick}>Prev Step</Button>
        <Button
          disabled={selectedCollections?.length === 0}
          onClick={onClickNext}
        >
          Next Step
        </Button>
      </Box>
    </>
  )
}
