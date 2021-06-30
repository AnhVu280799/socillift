export default theme => ({
  paperSize: {
    width: "100%",
    height: "100%",
    borderRadius: "3px",
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)"
  },
  cardContainer: {
    width: "100%",
    height: "100%"
  },
  firstRow: {
    width: "100%"
  },
  titleStyle: {
    ...theme.font.default,
    fontSize: "16px",
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    color: theme.colors.baseGrey(),
    width: "100%",
    height: "30%",
    paddingTop: "8%",
    paddingLeft: "10%"
  },
  valueStyle: {
    fontFamily: '"Roboto"',
    fontSize: "96px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: theme.colors.baseGrey(),
    width: "100%",
    height: "70%",
    paddingTop: "18%",
    paddingLeft: "10%",

    "& .no-result": {
      fontSize: "18px",
      color: "#999",
      fontWeight: "normal"
    }
  },
  imageContainer: {
    width: "100%",
    height: "100%"
  },
  cardImage: {
    width: "80%",
    height: "80%",
    padding: "0",
    top: "50%"
  },
  contentStyle: {
    ...theme.font.default,
    fontSize: "13px",
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    color: theme.colors.grey(),
    width: "100%",
    height: "auto",
    padding: "3% 8% 0 5%"
  }
});
