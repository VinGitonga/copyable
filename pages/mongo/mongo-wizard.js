import Stepper from '../../components/stepper'
import { useStepper } from '../../context'
import { Box } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

import MongoStepConfigureDb from '../../components/mongo/mongo-step-configure-db'
import MongoStepSelectDb from '../../components/mongo/mongo-step-select-db'
import MongoStepSelectCollections from '../../components/mongo/mongo-step-select-collections'
import MongoStepProceedToImport from '../../components/mongo/mongo-step-proceed-to-import'
import { useDatabaseMigrationStore } from '../../context/useDatabaseMigrationStore'

export default function MongoWizard() {
  const { incrementCurrentStep, decrementCurrentStep } = useStepper()
  const [databases, setDatabases] = useState([])
  const [collections, setCollections] = useState([])
  const [currentDb, setCurrentDb] = useState([])
  const host = useDatabaseMigrationStore(({ mongoHost }) => mongoHost)

  const getDbs = async () => {
    let resp = await axios.post(`/api/migrate-mongo/details/get-dbs`, { host })
    setDatabases(resp.data)
  }

  const getCollections = async () => {
    let resp = await axios.post(`/api/migrate-mongo/details/get-collections`, {
      host,
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
            <MongoStepConfigureDb handleNextStepClick={onClickNextToStep2} />
          </Stepper.Step>
          <Stepper.Step id={'selectDb'} name={'Select Database'}>
            <MongoStepSelectDb
              databases={databases}
              setCurrentDb={setCurrentDb}
              handlePreviousStepClick={decrementCurrentStep}
              handleNextStepClick={onClickNextToStep3}
            />
          </Stepper.Step>
          <Stepper.Step id={'third'} name={'Step 3'}>
            <MongoStepSelectCollections
              collections={collections}
              handlePreviousStepClick={decrementCurrentStep}
              handleNextStepClick={incrementCurrentStep}
            />
          </Stepper.Step>
          <Stepper.Step id={'forth'} name={'Step 4'}>
            <MongoStepProceedToImport
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
