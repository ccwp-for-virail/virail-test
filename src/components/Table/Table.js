import React from "react";
import PropTypes from "prop-types";

import { StyledTable, StyledTableBody, StyledTableHead } from "./Table.styled";

const Table = ({ children, columns, ...props }) => {
  return (
    <StyledTable {...props}>
      <StyledTableHead>
        {columns && (
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        )}
      </StyledTableHead>
      <StyledTableBody>{children}</StyledTableBody>
    </StyledTable>
  );
};

Table.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.arrayOf(PropTypes.string)
};

export default Table;
