import { Box, Button, Checkbox, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function MongoStepSelectCollections({
  collections,
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  const [checkedItems, setCheckedItems] = useState(
    collections?.map(() => false)
  )

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

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
      <Box textAlign={'left'}>
        <Button onClick={handlePreviousStepClick}>Prev Step</Button>
        <Button onClick={handleNextStepClick}>Next Step</Button>
      </Box>
    </>
  )
}
