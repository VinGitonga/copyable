// Chakra imports
import { Box, Flex, Select, Text, useColorModeValue } from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import PieChart from 'components/charts/PieChart'
import { VSeparator } from 'components/separator/Separator'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { useDatabaseMigrationStore } from '../../../../contexts/useDatabaseMigrationStore'

const formSchema = object({
  range: string(),
})

interface FormValues {
  range: string
}

export enum MigrationPieRanges {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

type ApexGeneric = ApexOptions & any

export const pieChartOptions: ApexGeneric = {
  labels: ['Successful', 'Error'],
  colors: ['#ae52e2', '#E31A1A'],
  chart: {
    width: '50px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },

  fill: {
    colors: ['#ae52e2', '#E31A1A'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    y: {
      formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
        return value + '%'
      },
    },
  },
}

export default function MigrationsPieCard(props: { [x: string]: any }) {
  const { failurePercentage, successPercentage } = useDatabaseMigrationStore()
  const [chartData, setChartData] = useState<number[]>([0, 0])
  useEffect(() => {
    setChartData([successPercentage, failurePercentage])
  }, [successPercentage, failurePercentage])

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: { range: MigrationPieRanges.MONTHLY },
  })
  const { register } = formMethods
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const cardColor = useColorModeValue('white', 'navy.700')
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )

  return (
    <Card
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      shadow="md"
      key={Date.now()}
      {...rest}
    >
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Total Migrations
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

      <PieChart
        h="100%"
        w="100%"
        chartData={chartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="brand.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Successful
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {chartData[0]}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="red.600" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Error
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {chartData[1]}%
          </Text>
        </Flex>
      </Card>
    </Card>
  )
}
