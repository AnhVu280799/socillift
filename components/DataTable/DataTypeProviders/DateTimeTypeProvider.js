import React from "react";
import moment from "moment";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const DateTimeFormatter = ({ value }) =>
  moment(value).format("HH:mm:ss DD/MM/YYYY");

export default props => (
  <DataTypeProvider formatterComponent={DateTimeFormatter} {...props} />
);
