export default theme => ({
  title: {
    ...theme.font.default,
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "25px",
    textAlign: "left",
    color: "#9DA4BA",
    marginBottom: '13px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
  },
  paperRoot: {
    padding: "20px",
    boxShadow: "20px 20px 30px rgba(122, 131, 163, 0.1)",
    width: "100%",
    height: "100%",
    borderRadius: "4px"
  },
  chart: {
    width: "100%",
    height: "90%",
  }
});
