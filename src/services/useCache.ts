import { useState } from "react";

const useCache = () => {
  const [result, setResult] = useState<Array<any>>([]);

  
  const query = async (url:string) => {
    const cacheKey = `usenotion_cache_${url.replace(/[/:]/g, '_')}`;
    const cachedDataString = localStorage.getItem(cacheKey);
    if(!!cachedDataString){
      setResult(JSON.parse(cachedDataString));
    }
    await fetch(url)
			.then(res => res.json())
			.then(data => {
				setResult(data)
        localStorage.setItem(cacheKey, JSON.stringify(data));
			});
  };
  return [query, result];
};

export default useCache;
