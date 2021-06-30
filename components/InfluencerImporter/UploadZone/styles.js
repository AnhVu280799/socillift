export default theme => ({
  root: {
    margin: "27px 7.6px",
    padding: "18px"
  },
  title: {
    fontSize: "2em", // 28px
    fontWeight: "bold",
    color: "#164C6D",
    textAlign: "center",
    margin: "37px"
  },
  description: {
    textAlign: "center",
    fontSize: "1em",
    color: "rgba(60, 72, 88, 0.6)",
    lineHeight: "167.8%"
  },
  linkSampleFileWrapper: {
    textAlign: "center"
  },
  linkSampleFile: {
    color: "#164C6D",
    fontWeight: "bold",
    lineHeight: "167.8%"
  },
  fileUploadWrapper: {
    margin: "42px auto",
    marginBottom: "20px",
    maxWidth: "918px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    "&::after": {
      content: "",
      flex: "auto"
    }
  },
  blockFile: {
    width: "166px",
    height: "166px",
    background: "#F3F5FB",
    color: "#3C4858",
    borderRadius: "25px",
    marginRight: "22px",
    position: "relative",
    "&:nth-child(5)": {
      margin: 0
    },
    "&:hover": {
      boxShadow: theme.defaultBoxShadow.boxShadow
    }
  },
  blockFileSuccess: {
    background: "#E5F7ED"
  },
  blockFileError: {
    background: "#FBE5E5",
    color: "#979CAC"
  },
  buttonAdd: {
    "& svg": {
      width: "58px",
      height: "58px"
    }
  },
  buttonRemove: {
    position: "absolute",
    top: "13px",
    right: "13px",
    color: "rgba(60, 72, 88, 0.6)",
    "&:hover": {
      color: "rgba(60, 72, 88, 1)"
    }
  },
  inputFile: {
    display: "none"
  },
  blockFile__fileName: {
    position: "absolute",
    left: "5%",
    bottom: "26px",
    textAlign: "center",
    wordWrap: "anywhere",
    overflow: "hidden",
    maxHeight: "2.6em",
    maxWidth: "90%",
    width: "90%"
  },
  buttonImport: {
    display: "block",
    margin: "0 auto 30px auto",
    width: "15em",
    height: "3em",
    "&:hover": {
      boxShadow: theme.defaultBoxShadow.boxShadow
    }
  },
  iconFile: {
    fontSize: "5em",
    position: "absolute",
    left: "30%",
    top: "15%"
  },
  iconLoading: {
    position: "absolute",
    left: "38%",
    top: "22%",
    color: "inherit"
  }
});
