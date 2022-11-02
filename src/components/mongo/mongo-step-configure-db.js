import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    useToast,
} from '@chakra-ui/react'
import {GrFormNextLink, GrHost} from 'react-icons/gr'
import {useState} from 'react'
import {TbPlugConnected} from 'react-icons/tb'
import {testConnectToDB} from 'services/migrate-mongo'
import {useDatabaseMigrationStore} from 'contexts/useDatabaseMigrationStore'

// @todo: extend from Stepper.Step
export default function MongoStepConfigureDb({ handleNextStepClick }) {
  const [readyToConnect, setReadyToConnect] = useState(false)
  const [loadingTest, setLoadingTest] = useState(false)
  const toast = useToast()
  const { mongoHost, setMongoHost } = useDatabaseMigrationStore()

  const customToast = ({ text, status = 'info' }) => {
    return toast({
      title: text,
      status: status,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  const clickTest = async () => {
    setLoadingTest(true)
    let status = await testConnectToDB({ mongoDbUri: mongoHost })
    if (status) {
      setLoadingTest(false)
      customToast({
        text: 'Connection to MongoDB is Okay 👍',
        status: 'success',
      })
      setReadyToConnect(true)
    } else {
      setLoadingTest(false)
      customToast({
        text: 'Connection to MongoDB failed 😢, check your MongoDB URI and try again!',
        status: 'warning',
      })
      setReadyToConnect(false)
    }
  }

  return (
    <Stack px={5}>
      <FormControl id="host">
        <FormLabel>Host</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <Icon as={GrHost} w={4} h={4} />
          </InputLeftElement>
          <Input
            variant={'flushed'}
            color={'gray.500'}
            value={mongoHost || ''}
            onChange={(e) => setMongoHost(e.target.value)}
            placeholder={
              'mongodb+srv://<username>:<password>@<clustername>.gdf0p.mongodb.net/?retryWrites=true&w=majority'
            }
          />
        </InputGroup>
        <FormHelperText>
          Paste the mongodb url from your cloud provider, eg, from Mongo Atlas
        </FormHelperText>
      </FormControl>
      <Flex align={'center'} justify={'space-between'}>
        <Button
          onClick={clickTest}
          disabled={!mongoHost}
          colorScheme={'cyan'}
          leftIcon={<TbPlugConnected />}
          isLoading={loadingTest}
          loadingText={'Connecting to MongoDB ....'}
        >
          Test Connection
        </Button>
        <Button
          onClick={handleNextStepClick}
          disabled={!mongoHost || !readyToConnect}
          rightIcon={<GrFormNextLink />}
        >
          Next Step
        </Button>
      </Flex>
    </Stack>
  )
}
