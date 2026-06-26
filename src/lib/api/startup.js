import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getStartup = async(startupId) => {
    return serverFetch(`/api/startups?startupId=${startupId}`);
}
export const getStartupById = async(startupId) => {
    return serverFetch(`/api/startups/${startupId}`);
}

export const getLoggedInStartup = async()=>{
    const user = await getUserSession();
    return getStartup(user?.id); 
}