import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    DocumentDuplicateIcon,
    AcademicCapIcon,
    UserIcon 
} from "@heroicons/react/24/solid";

import ManageStaff from './ManageStaff';
import ManageDepartment from './ManageDepartment';
import ManageCourse from './ManageCourse';
// import { AcademicCapIcon } from '@heroicons/react/solid';

function Manage({year}) {
    const [activeTab, setActiveTab] = React.useState("Course");
    const data = [
        {
            label: "Course",
            value: "Course",
            icon: AcademicCapIcon,
            desc: <ManageCourse year={year}/>,
        },

        {
            label: "Program",
            value: "Program",
            icon: DocumentDuplicateIcon,
            desc: <ManageDepartment year={year}/>,
        },
        {
            label: "Staff",
            value: "Staff",
            icon: UserIcon,
            desc: <ManageStaff year={year}/>,
        },
    ];

    return (
        <Tabs value={activeTab} className=' py-2 h-full'>
            <TabsHeader className=' ml-4 shadow-md  z-0  w-96 bg-white' indicatorProps={{
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
            <TabsBody className=' w-full h-full flex flex-col ' animate={{
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

export default Manage
