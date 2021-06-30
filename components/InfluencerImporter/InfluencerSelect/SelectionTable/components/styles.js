const colors = {
  grey: "#CCD0DF",
  lightGrey: "#F3F5FB",
  blue: "#009FDB",
  lightBlue: "#E5F5FB",
  green: "#00B04B",
  red: "#C70E0E",
  orange: "#FF9900"
};

export default theme => ({
  table: {
    "& col:nth-child(2)": { width: "25%" },
    "& col:nth-child(3)": { width: "10%" },
    "& col:nth-child(4)": { width: "35%" },
    "& col:nth-child(5)": { width: "10%" },
    "& col:nth-child(6)": { width: "20%" }
  },
  headerRow: {
    backgroundColor: colors.lightBlue
  },
  headerRowTitle: {
    color: colors.blue,
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "19px"
  },
  row: {
    "&:nth-of-type(even)": {
      background: colors.lightGrey
    },
    "&:hover": {
      background: colors.grey
    }
  },
  rowDisabled: {
    "& td": {
      color: colors.red
    }
  },
  rowStatusApproved: {
    color: colors.green
  },
  rowStatusRejected: {
    color: colors.red
  },
  rowStatusUnavailable: {
    color: colors.orange
  },
  selectCell: {
    overflow: "visible",
    paddingRight: 0,
    paddingLeft: theme.spacing.unit,
    textAlign: "center"
  },
  selectCellCheckbox: {
    marginTop: "-1px",
    marginBottom: "-1px",
    padding: theme.spacing.unit
  },
  pointer: {
    cursor: "pointer"
  },
  alignWithRowSpan: {
    verticalAlign: "bottom",
    paddingBottom: theme.spacing.unit * 0.5
  },
  selectCheckboxAll: {
    padding: theme.spacing.unit
  }
});
