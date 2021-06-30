export default theme => ({
  contactContainer: {
    width: "100%",
    height: "70px",
    background: "#FFFFFF",
    boxShadow: "20px 20px 30px rgba(251, 237, 233, 0.2)",
    borderRadius: "4px",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      height: "auto !important",
      padding: "10px",
    },
  },
  contactText: {
    padding: "15px 0 0 15px",
    textAlign: "left",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
      padding: "0",
    },
  },
  contactBtnContainer: {
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    },
  },
  contactButton: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "center",
    color: "#EFFBF4",
    boxShadow: "0px 4px 4px rgba(0, 176, 75, 0.2)",
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
  },
  topCircle: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "absolute",
    top: "-100%",
    right: "0",
    backgroundColor: "#009FDB",
    opacity: "0.04",
    [theme.breakpoints.down('sm')]: {
      top: "-60%",
    },
  },
  rightCircle: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "absolute",
    right: "-5%",
    bottom: "0",
    backgroundColor: "#009FDB",
    opacity: "0.06",
    [theme.breakpoints.down('sm')]: {
      right: "-35%",
    },
  }
});