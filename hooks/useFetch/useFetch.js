import { useEffect, useRef, useState } from 'react';

/**
 *
 * @param {String} url
 * @returns state
 */
export const useFetch = (url) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          if (data.length === 0)
            data.push({
              author: 'No se encuentra el id',
              quote: 'No se encuentra el id',
            });
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo obtener la informacion',
        });
      });
  }, [url]);

  return state;
};
