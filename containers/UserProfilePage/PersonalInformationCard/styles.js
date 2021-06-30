export default theme => ({
  root: {},
  form: {},
  avatar: {
    width: 80,
    height: 80
  },
  emailText: {
    fontWeight: "bolder",
    fontStyle: "italic"
  },
  avatarWrapper: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center"
  },
  avatarDescription: {
    paddingLeft: theme.spacing.unit * 2
  },
  cardContent: {
    paddingTop: 0
  }
});
