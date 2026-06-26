import React from 'react';

import FeaturedStartups from './FeatureStartup';
import { getStartup } from '@/lib/api/startup';
 

const StartUpData = async () => {

   
    const startup = await getStartup();
    console.log(startup);
    
    

    
    const startupsList = startup ? [startup] : [];

    return (
        <div>
            <p>hello</p>
       
            <FeaturedStartups startupsList={startupsList} />
        </div>
    );
};

export default StartUpData;