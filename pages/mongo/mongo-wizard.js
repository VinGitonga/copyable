import Stepper from '../../components/stepper'
import { useStepper } from '../../context'
import { Box } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import MongoStep1 from './mongo-step1'
import MongoStep2 from './mongo-step2'
import MongoStep3 from './mongo-step3'
import MongoStep4 from './mongo-step4'

export default function MongoWizard() {
  const { incrementCurrentStep, decrementCurrentStep } = useStepper()
  const [host, setHost] = useState('')
  const [databases, setDatabases] = useState([])
  const [collections, setCollections] = useState([])
  const [currentDb, setCurrentDb] = useState([])

  const getDbs = async () => {
    let resp = await axios.post(`/api/migrate-mongo/details/get-dbs`, {
      host: host,
    })
    setDatabases(resp.data)
  }

  const getCollections = async () => {
    let resp = await axios.post(`/api/migrate-mongo/details/get-collections`, {
      host: host,
      db: currentDb,
    })
    setCollections(resp.data)
  }

  const onClickNextToStep2 = async () => {
    await getDbs()
    incrementCurrentStep()
  }

  const onClickNextToStep3 = async () => {
    const collections = await getCollections()
    console.log(collections)
    incrementCurrentStep()
  }

  return (
    <Box>
      <Head>
        <title>Welcome to the MongoDB migration Wizard</title>
      </Head>
      <Stepper>
        <Stepper.Steps>
          <Stepper.Step id={'addMongoDbHost'} name={'Add MongoDB Host'}>
            <MongoStep1
              host={host}
              setHost={setHost}
              handleNextStepClick={onClickNextToStep2}
            />
          </Stepper.Step>
          <Stepper.Step id={'selectDb'} name={'Select Database'}>
            <MongoStep2
              databases={databases}
              setCurrentDb={setCurrentDb}
              handlePreviousStepClick={decrementCurrentStep}
              handleNextStepClick={onClickNextToStep3}
            />
          </Stepper.Step>
          <Stepper.Step id={'third'} name={'Step 3'}>
            <MongoStep3
              collections={collections}
              handlePreviousStepClick={decrementCurrentStep}
              handleNextStepClick={incrementCurrentStep}
            />
          </Stepper.Step>
          <Stepper.Step id={'forth'} name={'Step 4'}>
            <MongoStep4
              handlePreviousStepClick={decrementCurrentStep}
              handleNextStepClick={incrementCurrentStep}
            />
          </Stepper.Step>
        </Stepper.Steps>
      </Stepper>
    </Box>
  )
}

MongoWizard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
