const baseUrl = "https://startup-forge-server.vercel.app";
export const getOpportunities = async (companyId, status='active') => {
    const res = await fetch(`${baseUrl}/api/opportunities?companyId=${companyId}&status=${status}`);
    return res.json();
}