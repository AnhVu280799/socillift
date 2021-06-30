export default theme => ({
  root: {},
  inline: {
    display: "flex",
    flexFlow: "row wrap",
    "& > button:last-child": {
      marginLeft: "auto"
    }
  },
  lastBlock: {
    margin: "33px 0"
  },
  button: {
    width: "167.5px"
  }
});
