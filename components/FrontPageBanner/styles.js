import { DISCOVER_BANNER_URL } from "constants/common";

export default theme => ({
  root: {
    width: "initial",
    height: "233px",
    background: `url(${DISCOVER_BANNER_URL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "6px"
  },
  overlay: {
    flexGrow: 1,
    background: `linear-gradient(7deg, ${theme.colors.primary()} 0%, ${theme.colors.primaryLighter()} 100%)`,
    opacity: 0.92,
    borderRadius: "6px"
  },
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto"
  },
  title: {
    color: "#fff",
    fontSize: "18px",
    lineHeight: "25px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  button: {
    marginTop: "29px",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "19px",
    borderRadius: "24px",
    border: "solid 1px #fff",
    boxShadow: "none",
    transition: "none",
    "&:hover, &:focus": {
      color: theme.colors.primary(),
      backgroundColor: "#fff",
      boxShadow: "none",
      transition: "none"
    }
  }
});
