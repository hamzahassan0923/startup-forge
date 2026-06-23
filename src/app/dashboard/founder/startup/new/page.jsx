import React from 'react';
import CreateStartupPage from './CreateStartupPage';
import { getUserSession } from '@/lib/core/session';
import { getStartup } from '@/lib/api/startup';

const newStartupPage =async () => {
    const user = await getUserSession();
    
     console.log(user,"user bhao");
    return (
        <div>
            <CreateStartupPage startupData={user}  />
        </div>
    );
};

export default newStartupPage;