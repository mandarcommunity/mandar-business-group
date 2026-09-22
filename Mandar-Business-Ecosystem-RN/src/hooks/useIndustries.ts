import { useState, useEffect } from "react";
import { API } from "../services/api";

// Global cache
let cachedIndustries: string[] = [];

export function useIndustries() {
  const [industries, setIndustries] = useState<string[]>(cachedIndustries);

  useEffect(() => {
    if (cachedIndustries.length === 0) {
      API.get("/system/industries")
        .then((res) => {
          if (res.data && res.data.success) {
            cachedIndustries = res.data.data;
            setIndustries(cachedIndustries);
          }
        })
        .catch(console.error);
    }
  }, []);

  return { industries };
}
