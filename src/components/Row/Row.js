import React from "react";
import PropTypes from "prop-types";

import useSearch from "../../hooks/useSearch";

import { StyledCenteredCell, StyledErrorCell, StyledLink } from "./Row.styled";

const PureRow = ({ children, date, ...props }) => (
  <tr {...props}>
    <td>{date}</td>
    {children}
  </tr>
);

PureRow.propTypes = {
  children: PropTypes.node,
  date: PropTypes.string
};

const getArrival = (arrivalLocation, arrivalTime, diffDays) => {
  if (arrivalLocation && arrivalTime) {
    return !diffDays
      ? `${arrivalLocation} (${arrivalTime})`
      : `${arrivalLocation} (${arrivalTime}) +${diffDays}`;
  }
};

const getDeparture = (departureLocation, departureTime) =>
  departureLocation &&
  departureTime &&
  `${departureLocation} (${departureTime})`;

const Row = ({ date, config }) => {
  const {
    arrivalLocation,
    arrivalTime,
    departureLocation,
    departureTime,
    diffDays,
    duration,
    error,
    isFetching,
    load,
    price,
    transportType
  } = useSearch(date, config);

  if (isFetching) {
    return (
      <PureRow date={date}>
        <StyledCenteredCell colSpan={5}>LOADING</StyledCenteredCell>
      </PureRow>
    );
  }

  if (error) {
    return (
      <PureRow date={date}>
        <StyledErrorCell colSpan={5}>
          {error}{" "}
          <StyledLink href="#" onClick={load}>
            Retry?
          </StyledLink>
        </StyledErrorCell>
      </PureRow>
    );
  }

  const arrival = getArrival(arrivalLocation, arrivalTime, diffDays);
  const departure = getDeparture(departureLocation, departureTime);

  return (
    <PureRow date={date}>
      {[transportType, departure, arrival, duration, price].map(
        (field, index) => (
          <td key={index}>{field}</td>
        )
      )}
    </PureRow>
  );
};

Row.propTypes = {
  date: PropTypes.string.isRequired,
  config: PropTypes.object
};

export default Row;
