import {
  Badge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useDatabaseMigrationStore } from 'contexts/useDatabaseMigrationStore'
import { useCallback, useEffect, useRef, useState } from 'react'
import { migrateMongoDBToSingleStore } from 'services/migrate-mongo'
import { useRouter } from 'next/router'
import { object, string } from 'yup'
import { RiEyeCloseLine } from 'react-icons/ri'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const formSchema = object({
  selectedSDB: string().required('Required.'),
  dbUser: string().required('Required.'),
  dbPassword: string().required('Required.'),
})

interface FormValues {
  selectedSDB: any
  dbUser: string
  dbPassword: string
}

export default function MongoStepProceedToImport({
  handlePreviousStepClick,
  currentDb,
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: { dbPassword: null, dbUser: null },
  })
  const databasesRef = useRef({})
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'

  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const { selectedCollections, singlestoreDatabases, mongoHost } =
    useDatabaseMigrationStore()

  const handleStartMigrationClick = useCallback(
    async ({ dbPassword, dbUser, selectedSDB }: FormValues) => {
      const sDB = databasesRef.current[selectedSDB]

      let mongoConfig = {
        host: mongoHost,
        dbName: currentDb,
        selectedCollections,
      }

      let singleStoreConfig = {
        dbName: sDB.dbName,
        dbHost: sDB.dbHost,
        dbUser,
        dbPassword,
      }
      console.log(singleStoreConfig)

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
    },
    [mongoHost, selectedCollections, currentDb]
  )

  useEffect(() => {
    const newDatabasesRef: any = {}

    for (const item of singlestoreDatabases as any) {
      newDatabasesRef[item.dbName] = item
    }

    databasesRef.current = newDatabasesRef
  }, [singlestoreDatabases])

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
          <form
            onSubmit={handleSubmit(handleStartMigrationClick)}
            style={{ marginTop: 24 }}
          >
            <FormControl isInvalid={!!errors.selectedSDB} mb="24px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
              >
                Select Singlestore Database for which to Migrate To
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Select placeholder="Singlestore" {...register('selectedSDB')}>
                {singlestoreDatabases.map((dbs: any) => {
                  return (
                    <option key={dbs.dbName} value={dbs.dbName}>
                      {dbs.dbName}
                    </option>
                  )
                })}
              </Select>
              <FormErrorMessage>
                {errors.selectedSDB && (errors.selectedSDB?.message as any)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.dbUser} mb="24px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
              >
                Database User<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                {...register('dbUser')}
                variant="auth"
                fontSize="sm"
                placeholder="admin"
                fontWeight="500"
                size="lg"
                autoComplete={'dbUser'}
              />
              <FormErrorMessage>
                {errors.dbUser && errors.dbUser.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.dbPassword} mb="24px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
              >
                Database Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Password"
                  autoComplete={'dbPassword'}
                  mb="24px"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                  {...register('dbPassword')}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.dbPassword && errors.dbPassword.message}
              </FormErrorMessage>
            </FormControl>

            <Box textAlign={'center'}>
              <Button
                isLoading={loading}
                loadingText={'Migrating Data'}
                type="submit"
                colorScheme={'mongo'}
                style={{ margin: 10 }}
              >
                Start Migrating Data
              </Button>
            </Box>
          </form>
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
