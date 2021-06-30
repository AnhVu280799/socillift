import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from '@material-ui/core/Icon';

// core components
import buttonsStyle from 'assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx';

export const Contact = ({ icon, name, content }) => (
  <p>
    <Icon>{icon}</Icon>
    {' '}
    {name}
    {' '}
    &nbsp;
    {' '}
    {content}
  </p>
);

export default withStyles(buttonsStyle)(Contact);
