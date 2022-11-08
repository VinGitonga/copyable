import { Box, Button, Select, Text, Tooltip } from '@chakra-ui/react'

export default function MongoStepSelectDb({
  databases,
  currentDb,
  setCurrentDb,
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  function handleSelectDatabase(e) {
    setCurrentDb(e.target.value)
  }

  return (
    <Box textAlign={'center'}>
      <Text>
        Great! We have found some databases, please pick the one you want to
        import below
      </Text>
      <br />
      {!databases || databases.length === 0 ? (
        <Box textAlign={'center'}>Ups, no database found</Box>
      ) : (
        <Select placeholder="Select a database" onChange={handleSelectDatabase}>
          {databases.map(function (db) {
            return (
              <option key={db.name} value={db.name}>
                {db.name}
              </option>
            )
          })}
        </Select>
      )}
      <br />
      <Button onClick={handlePreviousStepClick}>Prev Step</Button>
      <Tooltip
        hasArrow
        placement="top"
        isDisabled={currentDb ? true : false}
        label={'Select Database to Proceed'}
      >
        <Button disabled={currentDb ? false : true} onClick={handleNextStepClick}>
          Next Step
        </Button>
      </Tooltip>
    </Box>
  )
}
