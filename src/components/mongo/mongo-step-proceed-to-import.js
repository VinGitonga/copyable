import { Box, Button, Text, Select, Stack, Badge } from '@chakra-ui/react'
import { useDatabaseMigrationStore } from '../../context/useDatabaseMigrationStore'


export default function MongoStepProceedToImport({
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  const { selectedCollections, singlestoreDatabases } =
    useDatabaseMigrationStore()

    // @todo Add Button to Activate Db Migration with backend functionality
  return (
    <Box>
      <Text>Selected Collections</Text>
      <Stack direction="row" my={2}>
        {selectedCollections.map((collectionName, i) => (
          <Badge key={i}>{collectionName}</Badge>
        ))}
      </Stack>
      {singlestoreDatabases.length > 0 ? (
        <Select placeholder="Select Singlestore Database for which to Migrate To">
          {singlestoreDatabases.map((dbs) => (
            <option value={dbs.dbName}>{dbs.dbName}</option>
          ))}
        </Select>
      ) : (
        <Text>You haven't added any Singlestore Database to your profile</Text>
      )}
      <Box mt={2}>
        <Button onClick={handlePreviousStepClick}>Prev Step</Button>
        <Button onClick={handleNextStepClick}>Next Step</Button>
      </Box>
    </Box>
  )
}
