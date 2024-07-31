import { useCallback, useEffect, useState } from "react";

const useGetData = (api) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    const res = await api();
    setData(res.data);
    setLoading(false);
  }, [api]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return { data, loading };
};

export default useGetData;
