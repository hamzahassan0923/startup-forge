import React from 'react';
import { getStartup } from '@/lib/api/startup';
import StartupTable from '@/components/StartupTable'; // পাথ ঠিক করে নেবেন

const StartupManagementPage = async () => {
    const startupId = "6a39011c03f916802acf8189";
    const startup= await getStartup(startupId);
    console.log(startup);

    if (!startup) {
        return <div className="p-6 text-red-500 font-bold">No Startup Found!</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Startup Management Console</h1>
                <p className="text-gray-500">Manage, update, or remove startup details securely.</p>
            </header>

            {/* আমাদের তৈরি করা টেবিল কম্পোনেন্ট */}
            <StartupTable initialData={startup} />
        </div>
    );
};

export default StartupManagementPage;









// import {  getStartup } from '@/lib/api/startup';
// import React from 'react';

// const StartupManagementPage =async () => {
//      const startups = "6a39011c03f916802acf8189"
//     const startup = await getStartup(startups)
//     console.log(startup);
//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-6">Startup Management</h1>
          
//         </div>
//     );
// };

// export default StartupManagementPage;