export default theme => ({
  paperSize: {
    width: "100%",
    height: "auto",
    borderRadius: "6px"
  },
  cardContainer: {
    width: "100%",
    height: "100%"
  },
  titleStyle: {
    ...theme.font.default,
    fontSize: "16px",
    textAlign: "left",
    color: theme.colors.baseGrey(),
    paddingTop: "3%",
    paddingLeft: "3%"
  },
  listCatesStyle: {
    width: "100%",
    height: "auto",
    padding: "3%",

    "& .no-result": {
      width: "100%",
      minHeight: "296.8px",
      fontSize: "18px",
      color: "#999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  categoryContentWrapper: {
    width: "100%",
    height: "auto",
    padding: "0 0 3% 0"
  },
  categoryContent: {
    width: "100%",
    height: "100%"
  },
  imgContainer: {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0 0 4% 0"
  },
  categoryImage: {
    borderRadius: "6px",
    width: "100%",
    height: "80px",
    backgroundPosition: "center",
    backgroundSize: "100%",
    objectFit: "cover"
  },
  textContainer: {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0 0 0 3%"
  },
  categoryName: {
    ...theme.font.default,
    fontSize: "16px",
    textAlign: "left",
    color: theme.colors.baseGrey(),
    paddingBottom: "2%",
    "&:hover": {
      color: theme.colors.primary()
    }
  },
  figuresStyle: {
    ...theme.font.default,
    fontSize: "14px",
    textAlign: "left",
    fontWeight: "bold",
    lineHeight: "19px",
    color: theme.colors.grey()
  },
  tooltipTitle: {
    ...theme.font.default,
    textAlign: "left",
    backgroundColor: theme.colors.baseGrey(),
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.14)",
    opacity: "0.95",
    borderRadius: "3px",
    fontSize: "14px",
    color: theme.colors.white()
  },
  unitStyle: {
    fontWeight: "normal",
    lineHeight: "19px",
    paddingLeft: "5px"
  }
});
