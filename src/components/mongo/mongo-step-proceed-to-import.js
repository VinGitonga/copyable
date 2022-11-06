import {
  Badge,
  Box,
  Button,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useDatabaseMigrationStore } from 'contexts/useDatabaseMigrationStore'
import { useState } from 'react'
import { testMigrate } from 'services/migrate-mongo'

export default function MongoStepProceedToImport({
  handlePreviousStepClick,
  currentDb,
}) {
  const [selectedSingleStoreDb, setSelectedSingleStoreDb] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { selectedCollections, singlestoreDatabases, mongoHost } =
    useDatabaseMigrationStore()

  const handleSelectedSinglestoreDb = (e) => {
    e.preventDefault()
    let dbName = e.target.value
    setSelectedSingleStoreDb(
      singlestoreDatabases.filter((item) => item.dbName === dbName)[0]
    )
  }

  const handleStartMigrationClick = async () => {
    let mongoConfig = {
      host: mongoHost,
      dbName: currentDb,
      collectionName: selectedCollections[0],
    }

    let singleStoreConfig = {
      dbName: selectedSingleStoreDb.dbName,
      dbUser: selectedSingleStoreDb.dbUser,
      dbHost: selectedSingleStoreDb.dbHost,
      dbPassword: selectedSingleStoreDb.dbPassword,
    }

    setLoading(true)

    try {
      let { collectionLen, tableName } = await testMigrate({
        mongoConfig,
        singleStoreConfig,
      })
      setLoading(false)
      toast({
        title: `Migrated ${collectionLen} to '${tableName}' Table in Singlestore`,
        isClosable: true,
        status: 'success',
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast({
        title: 'An error was encountered during migration',
        isClosable: true,
        status: 'error',
      })
    }
  }

  // @todo Add Button to Activate Db Migration with backend functionality
  return (
    <Box>
      <Text>Selected Collections</Text>
      <Stack direction="row" my={2}>
        {selectedCollections?.map((collectionName, i) => (
          <Badge key={i}>{collectionName}</Badge>
        ))}
      </Stack>
      {singlestoreDatabases.length > 0 ? (
        <>
          <Select
            placeholder="Select Singlestore Database for which to Migrate To"
            onChange={handleSelectedSinglestoreDb}
          >
            {singlestoreDatabases.map((dbs) => (
              <option key={dbs.dbName} value={dbs.dbName}>
                {dbs.dbName}
              </option>
            ))}
          </Select>

          <Box textAlign={'center'}>
            <Button
              isLoading={loading}
              loadingText={'Migrating Data'}
              onClick={handleStartMigrationClick}
              disabled={!selectedSingleStoreDb}
            >
              Start Migrating Data
            </Button>
          </Box>
        </>
      ) : (
        <Text>
          You haven&apos;t added any Singlestore Database to your profile
        </Text>
      )}
      <Box mt={2}>
        <Button onClick={handlePreviousStepClick}>Prev Step</Button>
      </Box>
    </Box>
  )
}
