export default theme => ({
  paperSize: {
    width: "100%",
    height: "100%",
    borderRadius: "6px",
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    position: "relative"
  },
  cardContainer: {
    width: "100%",
    height: "auto"
  },
  titleStyle: {
    ...theme.font.default,
    fontSize: "16px",
    textAlign: "left",
    color: theme.colors.baseGrey(),
    paddingTop: "3%",
    paddingLeft: "3%"
  },
  tagsContainer: {
    width: "100%",
    height: "auto",
    paddingBottom: "10px",

    "& .no-result": {
      marginTop: "15px",
      width: "100%",
      minHeight: "296.8px",
      fontSize: "18px",
      color: "#999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  fontTags: {
    ...theme.font.default,
    textAlign: "left",
    color: theme.colors.primary(),
    padding: "5px 10px",
    margin: "0 5px"
  },
  fontTags12: {
    fontSize: "12px"
  },
  fontTags14: {
    fontSize: "14px"
  },
  fontTags16: {
    fontSize: "16px"
  },
  fontTags18: {
    fontSize: "18px"
  },
  fontTags20: {
    fontSize: "20px"
  },
  fontTags22: {
    fontSize: "22px"
  },
  fontTags24: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  fontTags26: {
    fontSize: "26px",
    fontWeight: "bold"
  },
  fontTags28: {
    fontSize: "28px",
    fontWeight: "bold"
  },
  fontTags30: {
    fontSize: "30px",
    fontWeight: "bold"
  },
  floatingContent: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: "rgba(241, 238, 238, 0.7)"
  },
  imageStyle: {
    width: "30%",
    objectFit: "cover"
  },
  bigText: {
    ...theme.font.default,
    fontSize: "28px",
    fontWeight: "bold",
    lineHeight: "38px",
    color: "#3C4858"
  },
  smallText: {
    ...theme.font.default,
    fontSize: "18px",
    fontWeight: "normal",
    lineHeight: "25px",
    color: "#3C4858"
  }
});
