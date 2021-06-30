const colors = {
  lightGrey: "#DAE0F1",
  black: "#3C4858",
  lighterGrey: "#CCD0DF",
  white: "#fff",
  blue: "#009FDB"
};

export default theme => ({
  root: {
    borderRadius: "30px 30px 4px 4px",
    paddingBottom: "16px"
  },
  inputWrapper: {
    background: "#fff",
    border: "solid 1px rgba(0, 0, 0, 0.16)",
    borderRadius: "25px",
    padding: "10px 10px 4px 10px",
    boxShadow: theme.shadows[1]
  },
  tagsWrapper: {
    display: "flex",
    flexFlow: "row wrap",
    marginRight: "22px"
  },
  inputChip: {
    marginRight: "3px",
    backgroundColor: colors.lightGrey,
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "19px",
    "&:focus": {
      backgroundColor: colors.lightGrey
    }
  },
  inputRoot: {
    flex: 1,
    minWidth: "150px",
    lineHeight: "19px"
  },
  suggestListWrapper: {
    padding: "27px 1px 1px 1px"
  },
  suggestListContent: {
    height: "291px",
    padding: "61px 0px 0px 0px"
  },
  clearButton: {
    position: "absolute",
    right: "10px",
    top: "14px",
    cursor: "pointer",
    "&:hover": {
      color: "rgba(0,0,0,0.6)"
    }
  },
  removeIcon: {
    color: colors.black,
    marginLeft: theme.spacing.unit * 2
  },
  titleSuggest: {
    color: colors.lighterGrey,
    margin: "32px 0 16px 28px"
  },
  itemSelected: {
    backgroundColor: `${colors.blue} !important`,
    color: colors.white
  },
  textBold: {
    fontWeight: 800
  },
  list: {
    height: "176px",
    overflow: "auto"
  },
  chipRoot: {
    height: "100%",
    minHeight: "32px",
    marginBottom: "6px",
    maxWidth: "100%",
    justifyContent: "start"
  },
  chipLabel: {
    whiteSpace: "break-spaces",
    maxWidth: "100%",
    overflow: "hidden"
  },
  hidden: {
    visibility: "hidden"
  }
});
