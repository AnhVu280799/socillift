export default theme => ({
  container: {
    background: '#FFFFFF',
    boxShadow: '20px 20px 20px rgba(122, 131, 163, 0.1)',
    borderRadius: '4px',
    width: '100%',
    height: '670px',
  },
  titleStyle: {
    ...theme.font.default,
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '25px',
    color: '#9DA4BA',
    textAlign: 'left',
    padding: '40px 0 15px 28px',
    borderBottom: '1px solid #DCDFEA',
  },
  chartContainer: {
    padding: '30px 0 0 0',
  },
  valueStyle: {
    ...theme.font.default,
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '38px',
    color: '#3C4859',
    textAlign: 'center',
    paddingBottom: '20px',
  },
  labelContainer: {
    paddingTop: '14px',
  },
  labelStyleMale: {
    ...theme.font.default,
    fontSize: '24px',
    lineHeight: '33px',
    color: '#1B5DC0',
  },
  labelStyleFemale: {
    ...theme.font.default,
    fontSize: '24px',
    lineHeight: '33px',
    color: '#D04580',
  }
});
