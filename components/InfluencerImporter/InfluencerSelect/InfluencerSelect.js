import React from "react";
import PropTypes from "prop-types";

import { withStyles, Typography } from "@material-ui/core";

import InfluencerSelectionStats from "./SelectionStats";
import InfluencerSelectionTable from "./SelectionTable";
import { injectIntl } from 'react-intl';
import styles from "./styles";

class InfluencerSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    listInfluencers: PropTypes.array.isRequired,
    sorting: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
  };

  render() {
    const {
      classes,
      fileInfos,
      stats,
      listInfluencers,
      sorting,
      onSort,
      value,
      onChange,
      filters,
      onFilter
    } = this.props;
    const intl = this.props.intl;
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>{intl.formatMessage({ defaultMessage: "Influencer Select"})}</Typography>
        <InfluencerSelectionStats
          fileInfos={fileInfos}
          stats={stats}
          filters={filters}
          onFilter={onFilter}
        />
        <InfluencerSelectionTable
          listInfluencers={listInfluencers}
          value={value}
          onChange={onChange}
          sorting={sorting}
          onSort={onSort}
          filters={filters}
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "InfluencerSelect" })(
  InfluencerSelect
));
