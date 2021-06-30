import React from "react";
import { TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";

import styles from "./styles";
import { withStyles } from "@material-ui/core";

const RowComponentBase = ({ classes, ...rest }) => (
  <TableHeaderRow.Row className={classes.headerRow} {...rest} />
);

const TitleComponentBase = ({ classes, ...rest }) => (
  <TableHeaderRow.Title className={classes.headerRowTitle} {...rest} />
);

const RowComponent = withStyles(styles, { name: "HeaderRowComponent" })(
  RowComponentBase
);

const TitleComponent = withStyles(styles, { name: "HeaderTitleComponent" })(
  TitleComponentBase
);

export default ({ ...rest }) => (
  <TableHeaderRow
    rowComponent={RowComponent}
    titleComponent={TitleComponent}
    {...rest}
  />
);
