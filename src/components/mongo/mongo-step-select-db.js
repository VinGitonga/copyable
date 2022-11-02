import { Box, Button, Text } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

export default function MongoStepSelectDb({
  databases,
  setCurrentDb,
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  function handleSelectDatabase(e) {
    setCurrentDb(e.target.value)
  }

  if (!databases || databases.length === 0) {
    return <Box textAlign={'center'}>Ups, no database found</Box>
  }

  return (
    <Box textAlign={'center'}>
      <Text>
        Great! We have found some databases, please pick the one you want to
        import below
      </Text>
      <br />
      <Select placeholder="Select a database" onChange={handleSelectDatabase}>
        {databases.map(function (db) {
          return (
            <option key={db.name} value={db.name}>
              {db.name}
            </option>
          )
        })}
      </Select>
      <br />
      <Button onClick={handlePreviousStepClick}>Prev Step</Button>
      <Button onClick={handleNextStepClick}>Next Step</Button>
    </Box>
  )
}
