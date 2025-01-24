export const createQueryString = 
  (params: Record<string, string | number | boolean | undefined>) => {
    const searchParams = new URLSearchParams();
  
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  
  return searchParams.toString();
};