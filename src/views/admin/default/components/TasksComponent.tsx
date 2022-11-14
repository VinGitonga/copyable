// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
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
    onClose()
    const res = await deleteTask(taskToDelete)
    await fetchData()
    requestAnimationFrame(() => {
      if (res === null) {
        toast({ status: 'error', description: 'Failed to delete task!' })
      } else {
        toast({ status: 'success', description: 'Delete Task Completed!' })
      }

      setTaskToDelete(null)
    })
  }, [deleteTask, fetchData, onClose, taskToDelete, toast])

  const onCreateTaskHandler = useCallback(async () => {
    const res = await createTask({ text: 'New Task' })
    await fetchData()
    requestAnimationFrame(() => {
      if (res === null) {
        toast({ status: 'error', description: 'Failed to create task.' })
      } else {
        toast({ status: 'success', description: 'Create task completed!' })
      }
    })
  }, [createTask, fetchData, toast])

  const onUpdateTask = useCallback(
    async (newData: TaskItem) => {
      const res = await updateTask(newData)
      await fetchData()
      requestAnimationFrame(() => {
        if (res === null) {
          toast({ status: 'error', description: 'Failed to update task.' })
        } else {
          toast({ status: 'success', description: 'Update task completed!' })
        }
      })
    },
    [fetchData, toast, updateTask]
  )

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
      <Flex
        px="11px"
        w="100%"
        flexDirection="column"
        display="flex"
        maxH="50vh"
        overflow="auto"
      >
        {tasks.length === 0 && (
          <Text textAlign="center">
            No tasks were found. You can create tasks pressing on the plus icon
            on top.
          </Text>
        )}
        {tasks.map((item) => (
          <TaskItem
            {...item}
            textColor={textColor}
            key={item.id}
            onDeleteCallback={onDeleteTask}
            onUpdate={onUpdateTask}
          />
        ))}
      </Flex>

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
  onUpdate: (t: TaskItem) => void
  textColor: string
}

const TaskItem: FC<TaskItemProps> = ({
  onDeleteCallback = NOOP,
  onUpdate,
  ...task
}) => {
  const { isChecked, textColor, text } = task
  const [textValue, setTextValue] = useState(text)
  const deleteIconColor = useColorModeValue('red.600', 'red.400')
  const textDecoration = isChecked ? 'line-through' : 'unset'
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  return (
    <Flex w="100%" mb="20px" gap="2">
      <Checkbox
        isChecked={isChecked}
        me="16px"
        colorScheme="brandScheme"
        onChange={() => {
          onUpdate({ ...task, isChecked: !isChecked })
        }}
      />
      <Editable
        cursor="text"
        fontWeight="bold"
        textAlign="start"
        textDecoration={textDecoration}
        defaultValue={text}
        value={textValue}
        isDisabled={isChecked}
        flex="1"
        onChange={(v) => {
          setTextValue(v)

          if (textTimeoutRef.current !== null) {
            clearTimeout(textTimeoutRef.current)
            textTimeoutRef.current = null
          }

          textTimeoutRef.current = setTimeout(() => {
            onUpdate({ ...task, text: v })
            textTimeoutRef.current = null
          }, 1000)
        }}
      >
        <EditablePreview
          textDecoration={textDecoration}
          color={textColor}
          padding="2"
          fontSize="md"
        />
        <EditableInput
          textDecoration={textDecoration}
          color={textColor}
          padding="2"
          fontSize="md"
        />
      </Editable>
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
