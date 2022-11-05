// Chakra imports
import { Box, Grid } from '@chakra-ui/react'
import AdminLayout from 'layouts/admin'
import Layout from 'layouts/Layout'

import { NextPageWithLayout } from 'types/Layout'

// Custom components
import Banner from 'views/admin/profile/components/Banner'
import General from 'views/admin/profile/components/General'
import Notifications from 'views/admin/profile/components/Notifications'
import Projects from 'views/admin/profile/components/Projects'
import Storage from 'views/admin/profile/components/Storage'
import Upload from 'views/admin/profile/components/Upload'

// Assets
import banner from '../../public/static/img/auth/banner.png'
import avatar from '../../public/static/img/avatars/avatar4.png'

const ProfileOverview: NextPageWithLayout = () => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* <Grid
        mb="20px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      > */}
      {/* </Grid> */}
      <Notifications
        used={25.6}
        total={50}
        gridArea={{
          base: '3 / 1 / 4 / 2',
          lg: '2 / 1 / 3 / 3',
          '2xl': '1 / 3 / 2 / 4',
        }}
      />
    </Box>
  )
}

ProfileOverview.getLayout = (p) => {
  return <Layout>{p}</Layout>
}

export default ProfileOverview
