import {
  Checkbox,
  Flex,
  Icon,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import {
  ColumnInstance,
  Row,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  UseTableColumnProps,
} from 'react-table'

// Custom components
import Card from 'components/card/Card'
import Menu from 'components/menu/MainMenu'
import { TableProps } from '../variables/columnsData'
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdPending,
} from 'react-icons/md'
import { MigrationCheckTableStatus, TableData } from 'types/TableData'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const formSchema = object({
  range: string(),
})

interface FormValues {
  range: string
}

export enum MigrationsCheckTableRange {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export const columnsDataCheck = [
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
  // {
  //   Header: "PROGRESS",
  //   accessor: "progress",
  // },
  {
    Header: 'TABLES',
    accessor: 'quantity',
  },
  {
    Header: 'DATE',
    accessor: 'date',
  },
]

export default function MigrationsCheckTable() {
  const [tableData, setTableData] = useState<TableData[]>([
    {
      name: ['Siglestore DB US-WEST-1', false],
      quantity: 2458,
      status: MigrationCheckTableStatus.PROCESSING,
      date: '12 Jan 2021',
      progress: 17.5,
    },
    {
      name: ['Copy of Company (Postgres)', true],
      status: MigrationCheckTableStatus.COMPLETED,
      quantity: 1485,
      date: '21 Feb 2021',
      progress: 10.8,
    },
    {
      name: ['Copy of Mongo DB', true],
      status: MigrationCheckTableStatus.COMPLETED,
      quantity: 1024,
      date: '13 Mar 2021',
      progress: 21.3,
    },
    {
      name: ['Copy of .CSV', true],
      quantity: 858,
      status: MigrationCheckTableStatus.ERROR,
      date: '24 Jan 2021',
      progress: 31.5,
    },
    {
      name: ['Copy of .JSON', false],
      quantity: 258,
      date: '24 Oct 2022',
      status: MigrationCheckTableStatus.COMPLETED,
      progress: 12.2,
    },
  ])
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: { range: MigrationsCheckTableRange.MONTHLY },
  })
  const { register, watch } = formMethods
  const selectedRange = watch('range')

  const columns = useMemo(() => columnsDataCheck, [columnsDataCheck])
  const data = useMemo(() => tableData, [tableData])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance
  initialState.pageSize = 11

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

  useEffect(() => {
    // TODO: Update data here.
    console.log(selectedRange)
    setTableData((d) => d)
  }, [selectedRange])

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
      shadow="md"
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Single Store DBs
        </Text>
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
          {...register('range')}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index: number) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map(
                (
                  column: ColumnInstance & UseTableColumnProps<{}>,
                  index: number
                ) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {column.render('Header')}
                    </Flex>
                  </Th>
                )
              )}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: Row, index: number) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index: number) => {
                  let data
                  if (cell.column.Header === 'NAME') {
                    data = (
                      <Flex align="center">
                        <Checkbox
                          defaultChecked={cell.value[1]}
                          colorScheme="brandScheme"
                          me="10px"
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    )
                  } else if (cell.column.Header === 'PROGRESS') {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}%
                        </Text>
                      </Flex>
                    )
                  } else if (cell.column.Header === 'STATUS') {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === MigrationCheckTableStatus.COMPLETED
                              ? 'green.500'
                              : cell.value === MigrationCheckTableStatus.ERROR
                              ? 'red.500'
                              : cell.value ===
                                MigrationCheckTableStatus.PROCESSING
                              ? 'orange.500'
                              : null
                          }
                          as={
                            cell.value === MigrationCheckTableStatus.COMPLETED
                              ? MdCheckCircle
                              : cell.value ===
                                MigrationCheckTableStatus.PROCESSING
                              ? MdPending
                              : cell.value === MigrationCheckTableStatus.ERROR
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    )
                  } else if (cell.column.Header === 'TABLES') {
                    data = (
                      <Text color="brand.400" fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    )
                  } else if (cell.column.Header === 'DATE') {
                    data = (
                      <Text
                        color={textColor}
                        fontSize="sm"
                        minW="max"
                        fontWeight="700"
                      >
                        {cell.value}
                      </Text>
                    )
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Card>
  )
}
