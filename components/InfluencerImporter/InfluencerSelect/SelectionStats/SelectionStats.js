import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Typography,
  Grid,
  Paper,
  Tooltip
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { injectIntl } from 'react-intl';
import FileInfoChip from "./FileInfoChip";
import InfluencerSelectionCheckedBox from "./InfluencerSelectionCheckedBox";

import { parseKMB } from "utils";

import styles from "./styles";

class SelectionStats extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fileInfos: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
  };

  handleCheckedChange = key => checked => {
    let { filters, onFilter } = this.props;
    filters[key] = checked;

    onFilter(filters);
  };

  renderUploadedFiles = () => {
    const { classes, fileInfos } = this.props; 
    const intl = this.props.intl;
    return fileInfos.map(({ fileName, valid, error }, index) => {
      return (
        <Grid
          item
          key={index}
          className={classes.uploadedFilesItem}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <FileInfoChip
            fileName={fileName}
            variant={valid ? intl.formatMessage({ defaultMessage: "valid"}) : intl.formatMessage({ defaultMessage: "invalid"})}
            error={error}
          />
        </Grid>
      );
    });
  };

  renderAvailableVolume = () => {
    const { classes, stats } = this.props;
    const intl = props.intl;
    return (
      <div>
        <ListAltIcon className={classes.availableVolume__icon} />
        <div>
          <Typography className={classes.availableVolume__title}>
            {intl.formatMessage({ defaultMessage: "Available Volume"})}
          </Typography>
          <Tooltip title={Intl.NumberFormat("en-US").format(stats.total)}>
            <Typography className={classes.availableVolume__number}>
              {parseKMB(stats.total)}
            </Typography>
          </Tooltip>
        </div>
      </div>
    );
  };

  renderStateFilters = () => {
    const { stats, filters } = this.props;
    const intl = this.props.intl;
    return (
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <InfluencerSelectionCheckedBox
            variant="approved"
            label={intl.formatMessage({ defaultMessage: "Approved Profiles"})}
            number={stats.approved}
            checked={filters.approved}
            onChange={this.handleCheckedChange("approved")}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <InfluencerSelectionCheckedBox
            variant="rejected"
            label={intl.formatMessage({ defaultMessage: "Rejected Profiles"})}
            number={stats.rejected}
            checked={filters.rejected}
            onChange={this.handleCheckedChange("rejected")}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <InfluencerSelectionCheckedBox
            variant="unavailable"
            label={
              <Tooltip title="Include: New, Pending for Approval & Need to Update Profiles">
                <span>{intl.formatMessage({ defaultMessage: "Unavailable Profiles"})}</span>
              </Tooltip>
            }
            number={stats.unavailable}
            checked={filters.unavailable}
            onChange={this.handleCheckedChange("unavailable")}
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
            className={classes.uploadedFiles}
          >
            <Grid container>{this.renderUploadedFiles()}</Grid>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
            className={classes.availableVolume}
          >
            <div className={classes.arrowRightWhite}></div>
            {this.renderAvailableVolume()}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
            className={classes.stateFilter}
          >
            <div className={classes.arrowRightBlue}></div>
            {this.renderStateFilters()}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "InfluencerSelectionStats" })(
  SelectionStats
));
