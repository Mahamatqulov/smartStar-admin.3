"use client"

import { ArrowUp, ArrowDown } from "lucide-react"

export default function StatsCards() {
  const stats = [
    {
      title: "Total Projects",
      value: "276,346",
      change: "+2.5%",
      trend: "up",
    },
    {
      title: "Total Funding",
      value: "$8,668,904,981",
      change: "+4.7%",
      trend: "up",
    },
    {
      title: "Total Pledges",
      value: "101,440,004",
      change: "+1.3%",
      trend: "up",
    },
    {
      title: "Active Projects",
      value: "4,328",
      change: "-0.8%",
      trend: "down",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">{stat.title}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className={`text-sm flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {stat.trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  )
}
