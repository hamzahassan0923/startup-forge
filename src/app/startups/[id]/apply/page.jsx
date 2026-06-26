import { getStartupById } from '@/lib/api/startup';
import { getUserSession } from '@/lib/core/session';

import React from 'react';


const ApplyPage = async({params}) => {
    const id = await params;
    const user = await getUserSession();
console.log(user,id,'user');
  
const job = await getStartupById()
console.log(job,'job');
    return (
        <div>
            {/* <p>job{job.name}</p>
            <p></p>
     */}
        </div>
    );
};

export default ApplyPage;