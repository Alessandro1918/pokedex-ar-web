"use client"
import { useState, useEffect } from "react"
import { TbWorld } from "react-icons/tb"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import generations from "../../../public/data/generations.json"
import gen1 from "../../../public/data/gen1.json"
import gen2 from "../../../public/data/gen2.json"

// const chartData = [
//   { date: "2024-04-01", desktop: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
// ]

type Props = {
  data: {
    index: string,
    count: number
  }[]
}

const chartConfig = {
  views: {
    // label: "Page Views",
    label: "Encounters",
  },
  // desktop: { label: "Desktop", color: "var(--chart-2)" },
  // mobile: { label: "Mobile", color: "var(--chart-1)" },
  count: {
    label: "Encounters"
  }
} satisfies ChartConfig

export function ChartBar({ data }: Props) {

  const names = [...gen1, ...gen2]

  // const [ activeChart, setActiveChart ] = useState<keyof typeof chartConfig>("count")
  const activeChart = "count"

  const [ chartData, setChartData ] = useState(data)

  const [ selectedGenIndex, setSelectedGenIndex ] = useState(1)

  function handleDec() {
    if (selectedGenIndex > 1) {
      setSelectedGenIndex(selectedGenIndex - 1)
    }
  }

  function handleInc() {
    if (selectedGenIndex < generations.length) {
      setSelectedGenIndex(selectedGenIndex + 1)
    }
  }

  useEffect(() => {
    const start = generations[selectedGenIndex - 1].indexStart - 1
    const end = generations[selectedGenIndex - 1].indexEnd
    setChartData(data.slice(start, end))
  }, [selectedGenIndex])

  return (
    <div className="flex flex-col gap-6 w-full text-blue-100">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <button 
            onClick={handleDec}
            disabled={selectedGenIndex == 1} 
            className="text-blue-100 cursor-pointer disabled:text-blue-500 disabled:cursor-default" 
          >
            <FaChevronLeft className="size-3 mx-auto"/>
          </button>
          <div className="flex flex-row gap-1 items-baseline-last">
            <span className="text-2xl font-semibold">
              {generations[selectedGenIndex - 1].name}
            </span>
            <span className="text-xs font-semibold">
              {`(Generation #${selectedGenIndex})`}
            </span>
          </div>
          <button 
            onClick={handleInc}
            disabled={selectedGenIndex == generations.length} 
            className="text-blue-100 cursor-pointer disabled:text-blue-500 disabled:cursor-default" 
          >
            <FaChevronRight className="size-3 mx-auto"/>
          </button>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <TbWorld className="size-4"/>
          <span className="text-2xl font-semibold">
            {new Intl.NumberFormat('pt-BR').format(chartData.reduce((acc, curr) => acc + curr.count, 0))} {/* 50000 + 50000 -> 100.000, added, formatted */}
          </span>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-64 w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          // margin={{
          //   left: 12,
          //   right: 12,
          // }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="index"
            tickLine={false}
            axisLine={false}
            // tickMargin={8}
            // minTickGap={40}
            // stroke="#60a5fa"   // blue-400
            tickFormatter={value => {
              return ""
            }}
            // type="number"
            // ticks={[1, 25, 50, 75, 100, 125, 150, 175, 200]}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="text-black w-[150px]"
                nameKey="count"
                labelFormatter={value => {
                  return `#${value} - ${names[Number(value) - 1]}`  // "#1 - Bulbasaur"
                }}
              />
            }
          />
          <Bar dataKey={activeChart} fill="#60a5fa" />  {/* blue-400 */}
        </BarChart>
      </ChartContainer>
    </div>
  )
}
