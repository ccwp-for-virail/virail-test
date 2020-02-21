import { useCallback, useEffect, useRef, useState } from "react";
import isEmpty from "lodash/isEmpty";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import {
  fetchTravelOptions,
  processSearchRequest
} from "../services/search";
import { formatTime } from "../utils/date";

const useSearch = (date, initialConfig = {}) => {
  const isMounted = useRef(true);

  const [isFetching, setFetching] = useState(false);
  const [details, setDetails] = useState(initialConfig.details || {});
  const [error, setError] = useState(initialConfig.error || null);

  const load = useCallback(async () => {
    try {
      if (isMounted.current) {
        setFetching(true);
      }

      const result = await fetchTravelOptions(date);
      const { arrivalTime, departureTime, ...rest } = processSearchRequest(result);

      const formattedArrivalTime = formatTime(arrivalTime);
      const formattedDepartureTime = formatTime(departureTime);

      const diffDays = differenceInCalendarDays(arrivalTime, new Date(date));

      const combinedDetails = {
        arrivalTime: formattedArrivalTime,
        departureTime: formattedDepartureTime,
        diffDays,
        ...rest,
      };

      if (isMounted.current) {
        setDetails(combinedDetails);
        setError(null);
        setFetching(false);
      }

      return combinedDetails;
    } catch (e) {
      if (isMounted.current) {
        setDetails({});
        setError(e.message);
        setFetching(false);
      }
    }
  }, [date]);

  useEffect(() => {
    if (!error && isEmpty(details)) {
      const fetch = async () => load();

      fetch();
    }

    return () => {
      isMounted.current = false
    };
  }, []);

  return { date, error, isFetching, load, ...details };
};

export default useSearch;
