import React from "react";
import PropTypes from "prop-types";

import { COLUMNS, CURRENT_DATE } from "../config";
import { getUpcomingDays } from "../utils/date";

import Container from "../components/Container";
import Row from "../components/Row";
import Table from "../components/Table";

const Home = ({ days }) => (
  <Container>
    <Table columns={COLUMNS}>
      {days && days.map(date => <Row key={date} date={date} />)}
    </Table>
  </Container>
);

Home.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string)
};

Home.getInitialProps = () => {
  const date = CURRENT_DATE ? new Date(CURRENT_DATE) : new Date();

  return {
    days: getUpcomingDays(date)
  }
};

export default Home;
