import { Flex } from '@chakra-ui/react'
import AppLogo from 'components/icons/AppLogo'
import { FC } from 'react'

const FormAppLogo: FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyItems="center"
      w="full"
      flexDirection="row"
      mb="6"
      display={{ base: 'flex', lg: 'none' }}
    >
      <AppLogo center responsive={false} />
    </Flex>
  )
}

export default FormAppLogo
