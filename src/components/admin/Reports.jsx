import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import AddMarks from '../addMarks/addMarks';
import Entryreports from './Entryreports';
import PSOreports from './PSOreports';


function Reports({ year }) {
  const [activeTab, setActiveTab] = React.useState("Entry report");
  const data = [
    {
      label: "Entry report",
      value: "Entry report",
      icon: Square3Stack3DIcon,
      desc: <Entryreports year={year} />,
    },

    {
      label: "PSO reports",
      value: "PSO reports",
      icon: Cog6ToothIcon,
      desc: <PSOreports year={year} />,
    },
  ];

  return (
    <Tabs value={activeTab} className=' py-2 h-full'>
      <TabsHeader className=' w-[20rem] z-0 bg-white shadow-md px-2 ml-4' indicatorProps={{
        className: "bg-[#4f72cc] text-white",
      }}>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-white" : ""}>
            <div className="flex items-center gap-2 font-medium">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className=' w-full h-full flex flex-col' animate={{
        initial: { y: 250 },
        mount: { y: 0 },
        unmount: { y: 250 },
      }}>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>

  )
}

export default Reports