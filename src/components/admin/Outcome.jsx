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
    DocumentDuplicateIcon,
    AcademicCapIcon,
    UserIcon 
} from "@heroicons/react/24/solid";
import Students from './Students/Students';
import Programs from './Programs/Programs';
import Science from './Science/Science';
import Arts from './Arts/Arts';
import AdminCourseOutcome from './Course/CourseOutcome';

function Outcome({ year,currentSem }) {
    const [activeTab, setActiveTab] = React.useState("Student");
    const data = [
        {
            label: "Student",
            value: "Student",
            icon: UserIcon,
            desc: <Students year={year} currentSem={currentSem} />,
        },
        {
            label: "Course",
            value: "Course",
            icon: AcademicCapIcon,
            desc: <AdminCourseOutcome year={year} currentSem={currentSem} />,
        },

        {
            label: "Programme",
            value: "Programme",
            icon: DocumentDuplicateIcon,
            desc: <Programs year={year} currentSem={currentSem} />,
        },

        {
            label: "Science",
            value: "Science",
            icon: DocumentDuplicateIcon,
            desc: <Science year={year} currentSem={currentSem} />,
        },
        {
            label: "Arts",
            value: "Arts",
            icon: DocumentDuplicateIcon,
            desc: <Arts year={year} currentSem={currentSem} />,
        },

    ];

    return (
        <Tabs value={activeTab} className=' py-2 h-full'>
            <TabsHeader className=' w-[35rem] z-0 bg-white shadow-md px-2 ml-4' indicatorProps={{
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

export default Outcome
