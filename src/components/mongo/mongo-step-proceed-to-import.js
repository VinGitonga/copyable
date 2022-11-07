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
import { migrateMongoDBToSingleStore } from 'services/migrate-mongo'
import { useRouter } from 'next/router'

export default function MongoStepProceedToImport({
  handlePreviousStepClick,
  currentDb,
}) {
  const [selectedSingleStoreDb, setSelectedSingleStoreDb] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
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
      selectedCollections,
    }

    let singleStoreConfig = {
      dbName: selectedSingleStoreDb.dbName,
      dbUser: selectedSingleStoreDb.dbUser,
      dbHost: selectedSingleStoreDb.dbHost,
      dbPassword: selectedSingleStoreDb.dbPassword,
    }

    setLoading(true)

    try {
      let response = await migrateMongoDBToSingleStore({
        mongoConfig,
        singleStoreConfig,
      })
      console.log('Migration complete', response)
      const { success, error, migratedCollections } = response || {}
      setLoading(false)
      const errors = []
      const collections = (migratedCollections || [])
        .reduce((acc, resultForCollection) => {
          if (resultForCollection.success) {
            acc.push(resultForCollection.collection)
          } else {
            errors.push(
              `${resultForCollection.collection}: ${resultForCollection.error}`
            )
          }
          return acc
        }, [])
        .join(', ')
      toast({
        title:
          `Successfully migrated selected MongoDB Collections "${collections}" to your Singlestore database "${singleStoreConfig.dbName}"` +
          (errors.length > 0 ? `\nErrors: ${errors}` : ''),
        isClosable: true,
        duration: 15000,
        status: 'success',
      })
      await router.push('/dashboard')
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
              colorScheme={'mongo'}
              style={{ margin: 10 }}
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
