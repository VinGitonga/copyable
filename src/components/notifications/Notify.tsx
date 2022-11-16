import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Alert,
  Box,
  AlertDescription,
  CloseButton,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FiBell } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'

const Notify = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* <PopoverCloseButton /> */}
        {[...Array(5)].map((_, i) => (
            <NotifyContent key={i} />
        ))}
      </PopoverContent>
    </Popover>
  )
}

const NotifyContent = () => {
  const { onClose } = useDisclosure()
  return (
    <Alert status="info" variant={'subtle'} my={'2'}>
      <Flex align={'center'} justify={'space-between'} w={'full'}>
        <Flex align={'center'}>
          <Icon as={BiRocket} boxSize={'20px'} mr={'2'} />
          <Box>
            <AlertDescription>
              Thanks for submitting your application. Our team will get back to
              you soon.
            </AlertDescription>
          </Box>
        </Flex>
        <CloseButton onClick={onClose} />
      </Flex>
    </Alert>
  )
}

export default Notify
