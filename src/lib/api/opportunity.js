const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getOpportunities = async (companyId, status='active') => {
    const res = await fetch(`${baseUrl}/api/opportunities?companyId=${companyId}&status=${status}`);
    return res.json();
}