import React from "react";
import PropTypes from "prop-types";

import { withStyles, Paper } from "@material-ui/core";

import {
  SortingState,
  PagingState,
  IntegratedSorting,
  IntegratedPaging,
  SelectionState,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import { Grid, PagingPanel } from "@devexpress/dx-react-grid-material-ui";

import { Table, TableHeaderRow, TableSelection } from "./components";

import styles from "./styles";

class SelectionTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    listInfluencers: PropTypes.array.isRequired
  };

  tableColumns = [
    { name: "name", title: "Influencer Name" },
    { name: "platform", title: "Platform" },
    { name: "url", title: "Influencer URL" },
    { name: "status", title: "Status" },
    { name: "fileName", title: "File" }
  ];

  tableColumnExtensions = [
    { columnName: "name", wordWrapEnabled: true },
    { columnName: "platform", wordWrapEnabled: true },
    { columnName: "url", wordWrapEnabled: true },
    { columnName: "status", wordWrapEnabled: true },
    { columnName: "fileName", wordWrapEnabled: true }
  ];

  tablePageSizes = [10, 20, 50, 100];

  paperRef = React.createRef();

  state = {
    pageSize: 10,
    pageIndex: 0
  };

  get value() {
    return this.props.value.map(({ index }) => index);
  }

  get listInfluencers() {
    return this.props.listInfluencers;
  }

  handleSelectInfluencers = value => {
    const newValue = value.map(index => {
      const influencer = this.listInfluencers[index];

      return { index, ...influencer };
    });

    this.props.onChange(newValue);
  };

  handleSort = sorting => {
    this.props.onSort(sorting);
  };

  handlePageSizeChanged = pageSize => {
    this.setState({ pageSize, pageIndex: 0 }, () => {
      setTimeout(() => {
        this.paperRef.current.scrollIntoView({ smooth: true });
      }, 200);
    });
  };

  handlePageChanged = pageIndex => {
    this.setState({ pageIndex }, () => {
      setTimeout(() => {
        this.paperRef.current.scrollIntoView({ smooth: true });
      }, 200);
    });
  };

  render() {
    const { classes, sorting } = this.props;
    const { pageSize, pageIndex } = this.state;

    return (
      <Paper className={classes.root}>
        <span ref={this.paperRef} />
        <Grid columns={this.tableColumns} rows={this.listInfluencers}>
          <SortingState sorting={sorting} onSortingChange={this.handleSort} />
          <PagingState
            pageSize={pageSize}
            currentPage={pageIndex}
            onPageSizeChange={this.handlePageSizeChanged}
            onCurrentPageChange={this.handlePageChanged}
          />
          <SelectionState
            selection={this.value}
            onSelectionChange={this.handleSelectInfluencers}
          />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />
          <Table columnExtensions={this.tableColumnExtensions} />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <PagingPanel pageSizes={this.tablePageSizes} />
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: "InfluencerSelectionTable" })(
  SelectionTable
);
