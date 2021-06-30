import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "clsx";

import { withStyles, TableCell, Checkbox } from "@material-ui/core";

import { TableSelection } from "@devexpress/dx-react-grid-material-ui";

import styles from "./styles";

const TableSelectCellBase = ({
  style,
  selected,
  onToggle,
  classes,
  className,
  row,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <TableCell
    padding="checkbox"
    style={style}
    className={classNames(classes.selectCell, className)}
    {...restProps}
  >
    <Checkbox
      color="primary"
      className={classes.selectCellCheckbox}
      checked={!!row.id && selected}
      disabled={!row.id}
      onClick={e => {
        e.stopPropagation();
        onToggle();
      }}
    />
  </TableCell>
);

TableSelectCellBase.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string
};

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

const TableSelectCell = withStyles(styles, { name: "TableSelectCell" })(
  TableSelectCellBase
);

const TableSelectAllCellBase = ({
  allSelected,
  someSelected,
  disabled,
  onToggle,
  classes,
  className,
  tableRow,
  tableColumn,
  rowSpan,
  ...restProps
}) => {
  const cellClasses = classNames(
    {
      [classes.selectCell]: true,
      [classes.pointer]: !disabled,
      [classes.alignWithRowSpan]: rowSpan > 1
    },
    className
  );

  return (
    <TableCell
      padding="checkbox"
      className={cellClasses}
      rowSpan={rowSpan}
      {...restProps}
    >
      <Checkbox
        color="primary"
        checked={allSelected}
        className={classes.selectCheckboxAll}
        indeterminate={someSelected}
        disabled={disabled}
        onClick={e => {
          if (disabled) return;

          e.stopPropagation();
          onToggle();
        }}
      />
    </TableCell>
  );
};

TableSelectAllCellBase.propTypes = {
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number
};

TableSelectAllCellBase.defaultProps = {
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined
};

const TableSelectAllCell = withStyles(styles, { name: "TableSelectAllCell" })(
  TableSelectAllCellBase
);

export default ({ ...rest }) => (
  <TableSelection
    cellComponent={TableSelectCell}
    headerCellComponent={TableSelectAllCell}
    {...rest}
  />
);
