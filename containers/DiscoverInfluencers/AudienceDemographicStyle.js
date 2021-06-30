export default theme => ({
  root: {
    width: "100%",
    height: "auto",
    marginTop: "23px",
    background: "#FFFFFF",
    boxShadow: "20px 20px 30px rgba(122, 131, 163, 0.1)",
    borderRadius: "6px",
    display: "inline-block",
    padding: "24px 20% 0 20% ",
    [theme.breakpoints.down('md')]: {
      padding: '24px'
    }
  },
  headerContainer: {
    width: "100%",
    padding: "0 0 16px 0",
  },
  titleText: {
    ...theme.font.default,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "38px",
    textAlign: "center",
    color: "#164C6D",
    textTransform: "uppercase",
    width: "100%",
    margin: "0",
  },
  descriptionStyle: {
    ...theme.font.default,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "center",
    color: "rgba(60, 72, 88, 0.6)",
    margin: "0",
    paddingTop: "8px",
  },
  platformStyle: {
    ...theme.font.default,
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "center",
    color: "#164C6D",
    margin: "0",
    paddingLeft: "5px",
    display: "inline-block"
  },
  sectionContainer: {
    width: "100%",
    marginBottom: "8px",
    paddingTop: "24px"
  },
  sectionTitle: {
    ...theme.font.default,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#394878",
    textAlign: "left",
    paddingTop: "5px",
    position: "relative"
  },
  sectionAction: {
    width: "100%",
    padding: "0 2%",
    [theme.breakpoints.down('sm')]: {
      padding: '0'
    }
  },
  horizontalLine: {
    width: "100%",
    height: "1px",
    borderBottom: "1px solid #E4E7F0",
    paddingTop: "48px",
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
  lastTooltip: {
    left: "-29px"
  },
  toolTipIconAgeRange: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: "absolute",
    left: "116px",
    top: "4px",
    zIndex: "10",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey()
    }
  },
  toolTipIconGender: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: "absolute",
    left: "93px",
    top: "4px",
    zIndex: "10",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey()
    }
  },
  toolTipIconLocation: {
    fontSize: '21px',
    color: theme.colors.grey(),
    position: "absolute",
    left: "98px",
    top: "4px",
    zIndex: "10",
    transform: "rotate(180deg)",
    '&:hover': {
      color: theme.colors.baseGrey()
    }
  },
  btnBack: {
    ...theme.font.default,
    fontStyle: "normal",
    fontWeight: 'bold',
    fontSize: "14px",
    lineHeight: '19px',
    color: '#FFFFFF',
    textAlign: "center",
    boxShadow: "0px 4px 4px rgba(204, 208, 223, 0.2)",
    background: "#CCD0DF",
    width: "110px",
  },
  btnApply: {
    ...theme.font.default,
    fontStyle: "normal",
    fontWeight: 'bold',
    fontSize: "14px",
    lineHeight: '19px',
    color: '#FFFFFF',
    textAlign: "center",
    boxShadow: "0px 4px 4px rgba(204, 208, 223, 0.2)",
    background: "#009FDB",
    width: "110px",
  },
  oneLineItem: {
    width: "100%",
    padding: "8px",
    display: "block",
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0'
    }
  },
  cancelIcon: {
    fontSize: "18px",
    lineHeight: "32px",
    position: "absolute",
    top: "14px",
    left: "8px",
    height: "unset",
    cursor: "pointer"
  },
  selectionSimple: {
    width: "calc(100% - 32px)",
    marginLeft: "32px"
  },
  selectionSimpleGender: {
    width: "100%",
    marginLeft: "0"
  },
  selectionAdv: {
    width: "calc(100% - 96px)",
    marginLeft: "32px"
  },
  addMoreBtn: {
    border: `solid 1px ${theme.colors.primary(1.0)}`,
    ...theme.font.default,
    color: theme.colors.primary(1.0),
    fontSize: "12px",
    lineHeight: "1em",
    padding: "13px 0",
    width: "50%"
  },
});
