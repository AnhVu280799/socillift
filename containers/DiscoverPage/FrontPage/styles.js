export default theme => ({
  root: {
    minWidth: "320px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    padding: "0 16px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    width: "100%",
    color: "rgba(60, 72, 89, 0.89)"
  },
  topBanner: {},
  description: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "27px",
    maxWidth: "81%",
    margin: "16px auto 24px"
  },
  listWrapper: {
    width: 285,
    margin: "0 auto"
  },
  item: {
    padding: "16px 0 !important",
    "&:first-child": {
      paddingTop: "0 !important"
    },
    "&:last-child": {
      paddingBottom: "0 !important"
    }
  },
  endOfList: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "27px",
    maxWidth: "81%",
    margin: "32px auto 56px"
  },
  loading: {
    height: 50,
    margin: "32px 0 56px"
  },
  buttonLoadMore: {
    margin: "32px 0 56px"
  },
  [theme.breakpoints.up("sm")]: {
    header: {
      padding: "0 24px"
    },
    listWrapper: {
      width: "100%",
      maxWidth: 602
    },
    item: {
      padding: "16px !important",
      "&:nth-child(1), &:nth-child(2)": {
        paddingTop: "0 !important"
      },
      "&:nth-last-child(1), &:nth-last-child(2)": {
        paddingBottom: "0 !important"
      },
      "&:nth-child(odd)": {
        paddingLeft: "0 !important"
      },
      "&:nth-child(even)": {
        paddingRight: "0 !important"
      }
    }
  },
  [theme.breakpoints.up("md")]: {
    root: {
      padding: theme.defaultContentPadding
    },
    header: {
      padding: "initial"
    },
    content: {
      maxWidth: "1236px"
    },
    listWrapper: {
      width: "100%",
      maxWidth: "initial"
    },
    item: {
      padding: "16px !important",
      "&:nth-child(3), &:nth-child(4)": {
        paddingTop: "0 !important"
      },
      "&:nth-last-child(3), &:nth-last-child(4)": {
        paddingBottom: "0 !important"
      },
      "&:nth-child(odd)": {
        paddingLeft: "16px !important"
      },
      "&:nth-child(even)": {
        paddingRight: "16px !important"
      },
      "&:nth-child(4n+1)": {
        paddingLeft: "0 !important"
      },
      "&:nth-child(4n+4)": {
        paddingRight: "0 !important"
      }
    }
  }
});
