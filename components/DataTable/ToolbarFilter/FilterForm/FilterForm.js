import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid, Typography, TextField } from "@material-ui/core";
import { injectIntl } from 'react-intl';
import Button from "components/CustomButtons/ButtonInf";
import TypingSelect from "components/TypingSelect";
import DateRangePicker from "components/DateRangePicker";

import styles from "./styles";

class FilterForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    filterOptions: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    onApply: PropTypes.func,
    onReset: PropTypes.func
  };

  componentWillMount() {
    this.init();
  }

  init() {
    const { columns, filterOptions, filters } = this.props;

    this.columns = columns.reduce((arr, column) => {
      const found = filterOptions.find(option => option.name === column.name);

      if (!found) return arr;

      arr.push({
        ...column,
        ...found,
        filter: filters[column.name]
      });

      return arr;
    }, []);

    const state = {};

    this.columns.forEach(column => {
      switch (column.type) {
        case "select":
          state[column.name] = column.filter;
          break;

        case "multiselect":
          state[column.name] = column.filter;
          break;

        case "dateRange":
          state[column.name] = column.filter;
          break;

        default: // nothing
      }
    });

    this.setState(state);
  }

  handleApplyButtonClick = () => {
    this.props.onApply(this.state);
  };

  handleResetButtonClick = () => {
    new Promise(resolve => {
      this.props.onReset();

      resolve();
    }).then(() => {
      this.init();
    });
  };

  renderTextField = name => {
    const value = this.state[name] || "";

    return (
      <TextField
        value={value}
        onChange={e => this.setState({ [name]: e.target.value })}
        fullWidth
      />
    );
  };

  renderSelect = (name, options) => {
    const { classes } = this.props;

    return (
      <TypingSelect
        options={options}
        classes={{ valueContainer: classes.select__valueContainer }}
        value={options.filter(({ value }) => value === this.state[name])}
        onChange={({ value }) => {
          this.setState({ [name]: value });
        }}
      />
    );
  };

  renderMultiSelect = (name, options) => {
    const { classes } = this.props;

    return (
      <TypingSelect
        options={options}
        isMulti
        classes={{ valueContainer: classes.multiSelect__valueContainer }}
        value={options.filter(({ value }) =>
          (this.state[name] || []).includes(value)
        )}
        onChange={values => {
          const newValues = values.map(({ value }) => value);

          this.setState({ [name]: newValues });
        }}
      />
    );
  };

  renderDatePicker = () => {};

  renderDateRangePicker = name => {
    const { from, to } = this.state[name] || {};

    return (
      <DateRangePicker
        startDate={from}
        endDate={to}
        onApply={(from, to) => {
          this.setState({ [name]: { from, to } });
        }}
      />
    );
  };

  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    return (
      <form autoComplete="off">
        <Grid container className={classes.root}>
          {this.columns.map((column, index) => {
            const { name, title, type, options } = column;

            let children = null;

            switch (type) {
              case intl.formatMessage({ defaultMessage: "select"}):
                children = this.renderSelect(name, options);
                break;

              case  intl.formatMessage({ defaultMessage: "multiselect"}):
                children = this.renderMultiSelect(name, options);
                break;

              case intl.formatMessage({ defaultMessage: "dateRange"}):
                children = this.renderDateRangePicker(name);
                break;

              case intl.formatMessage({ defaultMessage: "text"}):
                children = this.renderTextField(name);
                break;

              default:
              // nothing
            }

            return (
              <Grid key={index} item xs={12} className={classes.fieldWrapper}>
                <Typography variant="subtitle2" className={classes.fieldTitle}>
                  {intl.formatMessage({ defaultMessage: "title"})}
                </Typography>
                {intl.formatMessage({ defaultMessage: "children"})}
              </Grid>
            );
          })}
          <Grid className={classes.buttonGroup} item xs={12} container>
            <Button
              color="dangerLight"
              className={classes.buttonReset}
              onClick={this.handleResetButtonClick}
            >
               {intl.formatMessage({ defaultMessage: "Reset"})}
            </Button>
            <Button
              color="primary"
              className={classes.buttonApply}
              onClick={this.handleApplyButtonClick}
            >
               {intl.formatMessage({ defaultMessage: "Apply"})}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "FilterForm" })(FilterForm));
