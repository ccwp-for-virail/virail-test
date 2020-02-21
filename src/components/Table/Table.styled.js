import styled from "styled-components";

export const StyledTable = styled.table`
  width: 80%;
`;

export const StyledTableHead = styled.thead`
  th {
    padding: 16px 36px;
    background-color: #26a1aa;
    text-transform: uppercase;
    color: white;
  }
`;

export const StyledTableBody = styled.tbody`  
  tr {
    &:nth-child(even) {
      background-color: #f6f6f6;
    }
  }

  td {
    padding: 16px;
  }
`;
