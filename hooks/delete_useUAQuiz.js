import { useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const useUAQuiz = (url, useToken) => {
  let [data, setData] = useState(null);
  let [error, setError] = useState("");
  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);
  return { data, error, loaded };
};

export { useUAQuiz };
