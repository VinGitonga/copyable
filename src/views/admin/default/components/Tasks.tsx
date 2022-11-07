// Chakra imports
import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import Menu from 'components/menu/MainMenu'
import IconBox from 'components/icons/IconBox'

// Assets
import { MdCheckBox, MdDragIndicator } from 'react-icons/md'

const tasks = [
  {
    text: 'Migrate data from MongoDB',
    isChecked: true,
  },
  {
    text: 'MySQL DB data migration',
    isChecked: true,
  },
  {
    text: 'CSV to Singlestore DB',
    isChecked: false,
  },
  {
    text: 'Migrate data from JSON',
    isChecked: false,
  },
  {
    text: 'Migration Pipeline setup',
    isChecked: true,
  },
]

export default function Conversion(props: { [x: string]: any }) {
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.700')
  const brandColor = useColorModeValue('brand.500', 'brand.400')
  return (
    <Card
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      shadow="md"
      {...rest}
    >
      <Flex alignItems="center" w="100%" mb="30px">
        <IconBox
          me="12px"
          w="38px"
          h="38px"
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w="24px" h="24px" />}
        />

        <Text color={textColor} fontSize="lg" fontWeight="700">
          Tasks
        </Text>
        <Menu ms="auto" />
      </Flex>
      <Box px="11px" w="100%">
        {tasks.map((item, i) => (
          <TaskItem
            isChecked={item.isChecked}
            text={item.text}
            textColor={textColor}
            key={i}
          />
        ))}
      </Box>
    </Card>
  )
}

const TaskItem = ({ isChecked, textColor, text }) => (
  <Flex w="100%" mb="20px">
    <Checkbox defaultChecked={isChecked} me="16px" colorScheme="brandScheme" />
    <Text fontWeight="bold" color={textColor} fontSize="md" textAlign="start">
      {text}
    </Text>
    <Icon
      ms="auto"
      as={MdDragIndicator}
      color="secondaryGray.600"
      w="24px"
      h="24px"
    />
  </Flex>
)
