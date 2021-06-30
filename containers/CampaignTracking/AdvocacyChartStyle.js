export default theme => ({
  wrapper: {
    overflowX: "hidden",
    overflowY: "hidden",
    width: "100%",
    height: "520px",
  },
  container: {
    background: "#FFFFFF",
    boxShadow: "20px 20px 20px rgba(122, 131, 163, 0.1)",
    borderRadius: "4px",
    width: "100%",
    height: "520px"
  },
  lengendListContainer: {
    textAlign: "end",
    paddingRight: "50px",
    [theme.breakpoints.down('sm')]: {
      padding: "0 0 0 32px",
      textAlign: "start",
      margin: "-16px 0 0 0"
    },
  },
  lengendListStyle: {
    listStyleType: "none",
    display: "inline-flex",
    paddingRight: "55px",
    [theme.breakpoints.down('sm')]: {
      padding: "0"
    },
  },
  lengendIcon: {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    margin: "0 15px 0 0",
  },
  lengendName: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    paddingTop: "2px",
    color: "#9DA4BA"
  }
});
