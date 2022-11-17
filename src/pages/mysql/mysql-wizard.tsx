import { Step, Steps, useSteps } from 'chakra-ui-steps'

import { Box } from '@chakra-ui/react'
import Layout from 'layouts/Layout'

import Head from 'next/head'

import { NextPageWithLayout } from 'types/Layout'

import MySQLSelectTablesComponent from 'components/mysql/MySQLSelectTablesComponent'
import MySQLToSinglestoreComponent from 'components/mysql/MySQLToSinglestoreComponent'
import MySQLHostDBComponent from 'components/mysql/MySQLHostDBComponent'

const MySQLWizardPage: NextPageWithLayout = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    {
      label: 'Add Mysql Host',
      content: <MySQLHostDBComponent handleNextStepClick={nextStep} />,
    },

    {
      label: 'Select Tables',
      content: (
        <MySQLSelectTablesComponent
          handlePreviousStepClick={prevStep}
          handleNextStepClick={nextStep}
        />
      ),
    },
    {
      label: 'Start Migrating',
      content: (
        <MySQLToSinglestoreComponent handlePreviousStepClick={prevStep} />
      ),
    },
  ]

  return (
    <Box>
      <Head>
        <title>Copyable | Mysql Migration Wizard</title>
      </Head>

      <Steps activeStep={activeStep} colorScheme={'mysql'}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box style={{ padding: 40 }}>{content}</Box>
          </Step>
        ))}
      </Steps>
    </Box>
  )
}

MySQLWizardPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default MySQLWizardPage
