export default theme => ({
  container: {
    background: "#FFFFFF",
    boxShadow: "20px 20px 20px rgba(122, 131, 163, 0.1)",
    borderRadius: "4px",
    width: "100%",
    height: "520px",
    position: "relative",
    overflow: "hidden"
  },
  titleContainer: {
    width: "100%",
    paddingTop: "24px"
  },
  titleStyle: {
    ...theme.font.default,
    width: "100%",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "25px",
    textAlign: "center",
    color: "rgba(60, 72, 89, 0.88)",
    margin: "0"
  },
  imageWrapper: {
    width: "100%",
    paddingTop: "16px"
  },
  imageContainer: {
    width: "100%",
    height: "auto",
    margin: "0"
  },
  imageStyle: {
    width: "35%",
    textAlign: "center"
  },
  descriptionContainer: {
    width: "100%",
    padding: "16px 16px 0 16px"
  },
  descriptionStyle: {
    ...theme.font.default,
    width: "100%",
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "justify",
    color: "rgba(1, 39, 53, 0.85)",
    margin: "0"
  },
  buttonContainer: {
    textAlign: "center",
    display: "inline-block",
    alignItems: "center",
    paddingTop: "8px"
  },
  contactButton: {
    ...theme.font.default,
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "center",
    color: "#FFFFFF",
    boxShadow: "0px 2px 2px rgba(240, 54, 117, 0.2)"
  },
  bottomCircle: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "absolute",
    bottom: "0%",
    right: "-30%",
    backgroundColor: "#009FDB",
    opacity: "0.06"
  },
  rightCircle: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    position: "absolute",
    right: "0",
    bottom: "-20%",
    backgroundColor: "#009FDB",
    opacity: "0.04"
  }
});
