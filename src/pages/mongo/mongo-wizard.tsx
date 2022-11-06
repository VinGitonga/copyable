import { Step, Steps, useSteps } from 'chakra-ui-steps'

import { Box } from '@chakra-ui/react'
import Layout from 'layouts/Layout'

import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

import MongoStepConfigureDb from 'components/mongo/mongo-step-configure-db'
import MongoStepSelectDb from 'components/mongo/mongo-step-select-db'
import MongoStepSelectCollections from 'components/mongo/mongo-step-select-collections'
import MongoStepProceedToImport from 'components/mongo/mongo-step-proceed-to-import'
import { useDatabaseMigrationStore } from 'contexts/useDatabaseMigrationStore'
import { NextPageWithLayout } from 'types/Layout'

const MongoWizard: NextPageWithLayout = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const [databases, setDatabases] = useState([])
  const [collections, setCollections] = useState([])
  const [currentDb, setCurrentDb] = useState([])
  const host = useDatabaseMigrationStore(({ mongoHost }) => mongoHost)

  const getDbs = async () => {
    let resp = await axios.post(`/api/mongodb/details/get-dbs`, { host })
    setDatabases(resp.data)
  }

  const getCollections = async () => {
    let resp = await axios.post(`/api/mongodb/details/get-collections`, {
      host,
      db: currentDb,
    })
    setCollections(resp.data)
  }

  const onClickNextToStep2 = async () => {
    await getDbs()
    nextStep()
  }

  const onClickNextToStep3 = async () => {
    const collections = await getCollections()
    console.log(collections)
    nextStep()
  }

  const steps = [
    {
      label: 'Add Mongo DB Host',
      content: (
        <MongoStepConfigureDb handleNextStepClick={onClickNextToStep2} />
      ),
    },
    {
      label: 'Select Database',
      content: (
        <MongoStepSelectDb
          databases={databases}
          setCurrentDb={setCurrentDb}
          handlePreviousStepClick={prevStep}
          handleNextStepClick={onClickNextToStep3}
        />
      ),
    },
    {
      label: 'Select Collections',
      content: (
        <MongoStepSelectCollections
          collections={collections}
          handlePreviousStepClick={prevStep}
          handleNextStepClick={nextStep}
        />
      ),
    },
    {
      label: 'Start Migrating',
      content: (
        <MongoStepProceedToImport
          handlePreviousStepClick={prevStep}
          currentDb={currentDb}
        />
      ),
    },
  ]

  return (
    <Box>
      <Head>
        <title>Copyable | MongoDB Migration Wizard</title>
      </Head>

      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box style={{ padding: 40 }}>{content}</Box>
          </Step>
        ))}
      </Steps>
    </Box>
  )
}

MongoWizard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default MongoWizard
