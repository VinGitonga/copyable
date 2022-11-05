import { Box, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
// Assets
// Custom components
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import { MdAddTask, MdFileCopy } from 'react-icons/md'

import Tasks from 'views/admin/default/components/Tasks'

import { NextPageWithLayout } from 'types/Layout'
import Layout from 'layouts/Layout'
import MigrationsCheckTable from 'views/admin/default/components/MigrationsCheckTable'
import MigrationsPieCard from 'views/admin/default/components/MigrationsPieCard'

const DashboardPage: NextPageWithLayout = () => {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="20px">
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="Pending Tasks"
            growthLabel="Completed"
            growth="23"
            value="154"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name="Total DB Migrations"
            value="2935"
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <MigrationsCheckTable />
          <MigrationsPieCard />
        </SimpleGrid>
        <Tasks />
      </>
    </Box>
  )
}

DashboardPage.getLayout = (p) => {
  return <Layout>{p}</Layout>
}

export default DashboardPage
