import React, { Component } from 'react';
import IconCard from 'components/Cards/IconCard.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from "@material-ui/core/styles/withStyles";
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { injectIntl } from 'react-intl';
import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx';
import FormControl from '@material-ui/core/FormControl';
import buttonsStyle from 'assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx';
import DotDotDot from 'react-dotdotdot';
import notificationsStyle from 'assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedFiltering,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
// utils
import { parseUnixTime } from 'utils';

export const stylesBasic = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    top: '3px',
    position: 'relative'
  },
  ...extendedFormsStyle,
  ...buttonsStyle,
  ...notificationsStyle
};
export const tableStyle = {
  tableColumn: {
    '& th:nth-child(1)': {
      width: '50%'
    },
    '& th:nth-child(2)': {
      width: '12%'
    },
    '& th:nth-child(3)': {
      width: '5%'
    },
    '& th:nth-child(4)': {
      width: '5%',
      textAlign: 'right'
    },
    '& th:nth-child(5)': {
      width: '10%',
      textAlign: 'right'
    },
    '& th:nth-child(6)': {
      width: '8%',
      textAlign: 'right'
    },
    '& th:nth-child(7)': {
      width: '7%',
      textAlign: 'right'
    }
  },
  tableRow: {
    '& td:nth-child(4)': {
      textAlign: 'right'
    },
    '& td:nth-child(5)': {
      textAlign: 'right'
    },
    '& td:nth-child(6)': {
      textAlign: 'right'
    }
  }
};
export const RecentPostsTablePure = ({ classes, ...rest }) => (
  <Table
    {...rest}
    headComponent={props => (
      <Table.TableHead {...props} className={classes.tableColumn} />
    )}
    rowComponent={props => (
      <Table.Row {...props} className={classes.tableRow} />
    )}
  />
);
const RecentPostsTable = withStyles(tableStyle)(RecentPostsTablePure);

export const IconPost = (numRows) => (
  <Typography variant="subheading" style={{ color: 'white' }}>
    {`${
      numRows
    } Posts`}
  </Typography>
);

export class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      pageSize: 10,
      showModal: false,
      searchValue: '',
      sort: 0,
      columns: [
        { name: 'content', title: 'Content' },
        { name: 'createdTime', title: 'Created Time' },
        { name: 'total', title: 'Total' },
        { name: 'totalLikes', title: 'Likes' },
        { name: 'totalComments', title: 'Comments' },
        { name: 'totalShares', title: 'Total Shares' },
        { name: 'actions', title: 'Action' }
      ],
      data: [],
      rows: [],
      expandedRowIds: [],
      sortingStateColumnExtensions: [
        { columnName: 'content', sortingEnabled: false },
        { columnName: 'createdTime', sortingEnabled: false }
      ]
    };
  }

  componentWillReceiveProps({ recentPosts }) {
    this.setState({
      data: recentPosts || [],
      rows: recentPosts
        ? recentPosts.map(
          ({
            id,
            message,
            createdTime,
            postId,
            totalLikes,
            totalComments,
            totalShares
          }) => ({
            content: (
              <div className="white-space-normal">
                <DotDotDot clamp={2}>{message}</DotDotDot>
              </div>
            ),
            createdTime: createdTime ? parseUnixTime(createdTime) : 'N/A',
            total: (
              totalLikes |
                (0 + totalComments) |
                (0 + totalShares) |
                0
            ).toLocaleString('en'),
            totalLikes: totalLikes ? totalLikes.toLocaleString('en') : 0,
            totalComments: totalComments
              ? totalComments.toLocaleString('en')
              : 0,
            totalShares: totalShares ? totalShares.toLocaleString('en') : 0,
            actions: [
              <a
                key={id}
                href={`https://facebook.com/${postId}`}
                target="_blank"
              >
                <KeyboardArrowRight />
              </a>
            ]
          })
        )
        : []
    });
  }

  render() {
    const { classes } = this.props;  const intl = this.props.intl;
    const {
      columns,
      rows,
      sort,
      pageSize,
      sortingStateColumnExtensions
    } = this.state;

    return (
      <IconCard
        icon={() => IconPost(rows.length)}
        iconColor="blue"
        content={(
          <GridContainer>
            <ItemGrid xs={8} sm={8} md={2} lg={2}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  {intl.formatMessage({ defaultMessage: "Showing"})}
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.pageSize}
                  inputProps={{
                    name: 'simpleSelect',
                    id: 'simple-select'
                  }}
                  onChange={({ target: { value } }) =>
                    this.setState({ pageSize: value })
                  }
                >
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={10}
                  >
                   {intl.formatMessage({ defaultMessage: " 10 per page"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={20}
                  >
                    {intl.formatMessage({ defaultMessage: "20 per page"})}
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={30}
                  >
                    {intl.formatMessage({ defaultMessage: "30 per page"})}
                  </MenuItem>
                </Select>
              </FormControl>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12} lg={12}>
              <Grid rows={rows} columns={columns}>
                <PagingState defaultCurrentPage={0} pageSize={pageSize} />
                {sort !== 0 && [
                  <SortingState
                    key={1}
                    sorting={[{ columnName: 'createdTime', direction: sort }]}
                    columnExtensions={sortingStateColumnExtensions}
                  />,
                  <IntegratedSorting key={2} />
                ]}
                <IntegratedFiltering />
                <IntegratedPaging />
                <RecentPostsTable />
                <TableHeaderRow />
                <PagingPanel />
              </Grid>
            </ItemGrid>
          </GridContainer>
        )}
      />
    );
  }
}

export default injectIntl ( withStyles(stylesBasic)(RecentPosts));
