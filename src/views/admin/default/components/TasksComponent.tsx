// Chakra imports
import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import IconBox from 'components/icons/IconBox'

// Assets
import { MdCheckBox } from 'react-icons/md'
import { useDashboardStore } from 'contexts/useDashboardStore'
import { DeleteIcon } from '@chakra-ui/icons'
import { NOOP } from 'helpers/helpers'
import { FC } from 'react'
import { TaskItem } from 'types/Tasks'

export default function Conversion(props: { [x: string]: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tasksData: tasks } = useDashboardStore()
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

interface TaskItemProps extends TaskItem {
  onDeleteCallback: (t: TaskItem) => void
  textColor: string
}

const TaskItem: FC<TaskItem> = ({
  isChecked,
  textColor,
  text,
  onDeleteCallback = NOOP,
}) => {
  const deleteIconColor = useColorModeValue('red.600', 'red.400')
  return (
    <Flex w="100%" mb="20px">
      <Checkbox
        defaultChecked={isChecked}
        me="16px"
        colorScheme="brandScheme"
      />
      <Text
        fontWeight="bold"
        textDecoration={isChecked ? 'line-through' : 'unset'}
        color={textColor}
        fontSize="md"
        textAlign="start"
      >
        {text}
      </Text>
      <Icon
        cursor="pointer"
        ms="auto"
        as={DeleteIcon}
        color={deleteIconColor}
        w="24px"
        h="24px"
      />
    </Flex>
  )
}
