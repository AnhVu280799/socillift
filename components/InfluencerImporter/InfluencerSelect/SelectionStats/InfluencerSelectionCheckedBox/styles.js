const colors = {
  gray: "#ccc",
  green: "#00B04B",
  lightGreen: "#E5F7ED",
  red: "#C70E0E",
  lightRed: "#FBE5E5",
  yellow: "#FF9900",
  lightYellow: "#FFF5E5"
};

export default theme => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    margin: "9px 0",
    padding: "0 0 0 16px",
    background: colors.gray
  },
  number: {
    fontSize: "1.428em",
    fontWeight: 800
  },
  label: {
    fontSize: "1em"
  },
  text: {
    fontSize: "14px",
    lineHeight: "19px",
    marginLeft: "13px"
  },
  textBold: {
    fontSize: "20px",
    fontWeight: 800,
    lineHeight: "27px"
  },
  textApproved: {
    color: colors.green
  },
  textRejected: {
    color: colors.red
  },
  textUnavailable: {
    color: colors.yellow
  },
  bgApproved: {
    background: colors.lightGreen
  },
  bgRejected: {
    background: colors.lightRed
  },
  bgUnavailable: {
    background: colors.lightYellow
  },
  last: {
    marginLeft: "auto"
  }
});
