import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import { injectIntl } from 'react-intl';

// custom components
import contentActivityLogsStyle from "assets/jss/material-dashboard-pro-react/components/contentActivityLogsStyle.jsx";

class ContentActivityLogs extends React.Component {
  render() {
    const { classes, activityLogs } = this.props;
    const intl = this.props.intl;

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };

    return (
      <GridContainer className={classes.gridContainerCustom}>
        <div className={classes.divTable}>
          <div className={classes.divTableHeading}>
            <div className={classes.divTableHeadingRow}>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "DATE TIME"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "CLIENT IP"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "USER"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "ROLE"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "ACTION"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "DESCRIPTION"})}</div>
            </div>
          </div>
          <div className={classes.divTableBody}>
            {activityLogs &&
              activityLogs.map((logs, idx) => (
                <div className={classes.divTableRow} key={idx}>
                  <div className={classes.divTableCell}>
                    {new Date(logs.createdTime).toLocaleDateString(
                      "en-us",
                      options
                    )}
                  </div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "logs.clientIP"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "logs.user"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "logs.role"})}</div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "logs.activity"})}</div>
                  <div className={classes.divTableCell}>
                    <div style={{ maxHeight: "150px", overflow: "auto" }}>
                      <pre style={{ fontFamily: "inherit" }}>
                        {intl.formatMessage({ defaultMessage: "logs.description"})}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </GridContainer>
    );
  }
}

ContentActivityLogs.propTypes = {};
export default injectIntl(withStyles(contentActivityLogsStyle)(ContentActivityLogs)) ;
