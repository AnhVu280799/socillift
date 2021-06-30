import React, { useState } from 'react';
import { withStyles, Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { getCurrentLang, changeLang } from 'utils/localize';
import { FormattedMessage } from 'react-intl';
import AppLanguages from 'constants/appLanguages';
import clsx from 'clsx';
import { capitalize } from 'lodash';
import { injectIntl } from 'react-intl';
const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing.unit * 2
  },
  rootCollapsed: {
    flexDirection: 'column',
    padding: theme.spacing.unit * 2
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  dropdown: {
    flex: 1
  },
  padding: {
    paddingRight: theme.spacing.unit
  }
});

const LanguageSwitcher = ({ classes, isCollapsed }) => {
  const [lang, setLang] = useState(getCurrentLang());

  const handleChangeLang = event => {
    const newLang = event.target.value;

    setLang(newLang);
    changeLang(newLang);
  };

  return (
    <Grid className={isCollapsed ? classes.rootCollapsed : classes.root}>
      <Typography className={clsx({ [classes.title]: true, [classes.padding]: !isCollapsed })}>
        {isCollapsed ? <FormattedMessage defaultMessage="Lang:" /> : <FormattedMessage defaultMessage="Language:" />}
      </Typography>
      <Select className={classes.dropdown} value={lang} onChange={handleChangeLang}>
        {AppLanguages.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {isCollapsed ? capitalize(code) : name}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default injectIntl (withStyles(styles, { name: 'LanguageSwitcher' })(LanguageSwitcher));
