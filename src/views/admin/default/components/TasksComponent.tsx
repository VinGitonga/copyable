// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useStyleConfig,
  useToast,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import IconBox from 'components/icons/IconBox'

// Assets
import { MdCheckBox } from 'react-icons/md'
import { useDashboardStore } from 'contexts/useDashboardStore'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { NOOP } from 'helpers/helpers'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { TaskItem } from 'types/Tasks'
import useTaskUtils from 'hooks/useTaskUtils'

export default function Conversion(props: { [x: string]: any }) {
  const { deleteTask, createTask, updateTask, fetchTasks } = useTaskUtils()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [taskToDelete, setTaskToDelete] = useState<TaskItem | null>(null)
  const isFetching = useRef(false)

  const { tasksData: tasks, setTasksData } = useDashboardStore()
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.700')
  const brandColor = useColorModeValue('brand.500', 'brand.400')
  const modalStyles = useStyleConfig('Modal')

  const fetchData = useCallback(async () => {
    if (isFetching.current) {
      return
    }

    isFetching.current = true
    const newData = await fetchTasks()
    setTasksData(newData)

    isFetching.current = false
  }, [fetchTasks, setTasksData])

  const onDeleteTask = useCallback(
    async (t: TaskItem) => {
      setTaskToDelete(t)
      requestAnimationFrame(onOpen)
    },
    [onOpen]
  )

  const onDeleteTaskCallback = useCallback(async () => {
    const res = await deleteTask(taskToDelete?.id)
    requestAnimationFrame(() => {
      if (res === null) {
        toast({ status: 'error', description: 'Failed to delete task!' })
      } else {
        toast({ status: 'success', description: 'Delete Task Completed!' })
      }

      setTaskToDelete(null)
      onClose()
    })
  }, [deleteTask, onClose, taskToDelete?.id, toast])

  const onCreateTaskHandler = useCallback(async () => {
    const res = await createTask({ text: 'New Task' })
    await fetchData()
    requestAnimationFrame(() => {
      if (res === null) {
        toast({ status: 'error', description: 'Failed to create task.' })
      } else {
        toast({ status: 'success', description: 'Create Task Completed!' })
      }

      setTaskToDelete(null)
      onClose()
    })
  }, [createTask, fetchData, onClose, toast])

  useEffect(() => {
    fetchData()

    const intervalRef = setTimeout(() => {
      fetchData()
    }, 1000 * 15)

    return () => {
      clearInterval(intervalRef)
    }
  }, [fetchData])

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

        <Icon
          onClick={onCreateTaskHandler}
          cursor="pointer"
          ms="auto"
          as={AddIcon}
          color={textColor}
          fontSize="1.25rem"
        />
      </Flex>
      <Box px="11px" w="100%">
        {tasks.length === 0 && (
          <Text textAlign="center">
            No tasks were found. You can create tasks pressing on the plus icon
            on top.
          </Text>
        )}
        {tasks.map((item, i) => (
          <TaskItem
            {...item}
            textColor={textColor}
            key={i}
            onDeleteCallback={onDeleteTask}
          />
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent __css={modalStyles}>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{taskToDelete?.text}</ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={onDeleteTaskCallback}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}

interface TaskItemProps extends TaskItem {
  onDeleteCallback: (t: TaskItem) => void
  textColor: string
}

const TaskItem: FC<TaskItemProps> = ({ onDeleteCallback = NOOP, ...task }) => {
  const { isChecked, textColor, text } = task
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
        onClick={() => {
          onDeleteCallback(task)
        }}
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
