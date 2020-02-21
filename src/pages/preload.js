import React from "react";
import PropTypes from "prop-types";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { COLUMNS, CURRENT_DATE } from "../config";
import { formatTime, getUpcomingDays } from "../utils/date";
import { fetchTravelOptions, processSearchRequest } from "../services/search";

import Container from "../components/Container";
import Row from "../components/Row";
import Table from "../components/Table";

const Preload = ({ config, days }) => (
  <Container>
    <Table columns={COLUMNS}>
      {days &&
        days.map((date, index) => (
          <Row key={date} date={date} config={config[index]} />
        ))}
    </Table>
  </Container>
);

Preload.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.arrayOf(PropTypes.object)
};

Preload.getInitialProps = async () => {
  const date = CURRENT_DATE ? new Date(CURRENT_DATE) : new Date();
  console.log(date);
  const days = getUpcomingDays(date);

  const promises = days.slice(0, 4).map(async day => {
    try {
      const result = await fetchTravelOptions(day);
      const { arrivalTime, departureTime, ...rest } = processSearchRequest(
        result
      );

      const formattedArrivalTime = formatTime(arrivalTime);
      const formattedDepartureTime = formatTime(departureTime);

      const diffDays = differenceInCalendarDays(arrivalTime, new Date(day));

      return {
        details: {
          arrivalTime: formattedArrivalTime,
          departureTime: formattedDepartureTime,
          diffDays,
          ...rest
        }
      };
    } catch (e) {
      return { error: e.message };
    }
  });

  const config = await Promise.all(promises);

  return {
    days,
    config
  };
};

export default Preload;
