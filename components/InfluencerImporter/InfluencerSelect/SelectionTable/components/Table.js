import React from "react";
import clsx from "clsx";

import { Table } from "@devexpress/dx-react-grid-material-ui";

import { withStyles, Tooltip } from "@material-ui/core";

import styles from "./styles";

const TableComponentBase = ({ classes, ...rest }) => (
  <Table.Table className={classes.table} {...rest} />
);

const TableComponent = withStyles(styles, { name: "TableComponent" })(
  TableComponentBase
);

const RowComponentBase = ({ classes, row, ...rest }) => (
  <Table.Row
    className={clsx(classes.row, { [classes.rowDisabled]: !row.id })}
    row={row}
    {...rest}
  />
);

const RowComponent = withStyles(styles, { name: "RowComponent" })(
  RowComponentBase
);

const CellComponentBase = ({ classes, column, value, ...rest }) => {
  let className;

  if (column.name === "status") {
    className = classes[`rowStatus${value}`];

    if (value === "Unavailable") {
      value = (
        <Tooltip title="Include: New, Pending for Approval & Need to Update Profiles">
          <span>{value}</span>
        </Tooltip>
      );
    }
  }

  if (column.name === "url") {
    value = (
      <a
        rel="noopener noreferrer"
        style={{ color: "inherit" }}
        href={value}
        target="_blank"
      >
        {value}
      </a>
    );
  }

  return (
    <Table.Cell className={className} column={column} value={value} {...rest} />
  );
};

const CellComponent = withStyles(styles, { name: "CellComponent" })(
  CellComponentBase
);

export default ({ ...rest }) => (
  <Table
    tableComponent={TableComponent}
    rowComponent={RowComponent}
    cellComponent={CellComponent}
    {...rest}
  />
);
