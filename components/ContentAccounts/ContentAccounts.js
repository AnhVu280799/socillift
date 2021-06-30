import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Delete from '@material-ui/icons/Delete';
import ModeEdit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { injectIntl } from 'react-intl';

// custom components
import contentAccountsStyle from "assets/jss/material-dashboard-pro-react/components/contentAccountsStyle.jsx"

import DotDotDot from 'react-dotdotdot';

// constants
import defaultAvatar from "assets/img/placeholder.jpg";

class ContentAccounts extends React.Component {
  render() {
    const { classes, accounts, onClickEdit, onClickDelete } = this.props;
    const intl=this.props.intl;
    return (
      <GridContainer className={classes.gridContainerCustom}>
        <div className={classes.divTable}>
          <div className={classes.divTableHeading}>
            <div className={classes.divTableHeadingRow}>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "NAME"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "EMAIL"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "ROLE"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "LAST ACT"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "STATUS"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "ACTIONS"})}</div>
            </div>
          </div>
          <div className={classes.divTableBody}>
            {
              accounts && accounts.map(({ id, name, email, roleName, lastActiveTime, status }, idx) => (
                <div className={classes.divTableRow} key={idx}>
                  <div className={classes.divTableCell + " " + classes.name}>
                    <div className={classes.divTableBrandName}>
                      <img src={intl.formatMessage({ defaultMessage: "defaultAvatar"})} className={classes.postImage} />
                      {name}
                    </div>
                  </div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "email"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "roleName"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "lastActiveTime"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "status"})}</div>
                  <div className={classes.divTableCell}>
                    <IconButton
                      key="edit"
                      onClick={() => onClickEdit(idx)}
                      classes={{
                        root: classes.button
                      }}
                    >
                      <ModeEdit />
                    </IconButton>
                    <IconButton
                      key="delete"
                      onClick={() => onClickDelete(idx)}
                      classes={{
                        root: classes.button
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </GridContainer>
    );
  }
}

ContentAccounts.propTypes = {
};
export default injectIntl(withStyles(contentAccountsStyle)(ContentAccounts)) ;
