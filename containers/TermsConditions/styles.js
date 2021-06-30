export default theme => ({
  mainDiv: {
    width: "100%",
    padding: '0px 32px 32px 32px',
    overflow: 'visible'
  },
  container: {
    ...theme.font.default,
    width: '100%',
    height: '100%',
    borderRadius: '6px',
    padding: '16px 32px',
    textAlign: 'justify'
  }
})