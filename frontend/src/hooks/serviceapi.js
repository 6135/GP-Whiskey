// write a post api Service
export const usePostApi = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, data);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [url, data]);

  return { response, error, loading, fetchData };
}
// write a get api service
export const useGetApi = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, data);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [url, data]);

  return { response, error, loading, fetchData };
}

// write a put api service
export const usePutApi = (url, data) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
        const response = await axios.put(url, data);
        setResponse(response.data);
        } catch (error) {
        setError(error);
        }
        setLoading(false);
    }, [url, data]);
    
    return { response, error, loading, fetchData };
    }