import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { injectIntl } from 'react-intl';
import { DateRangePicker } from "react-date-range";
import {
  withStyles,
  Popover,
  Button,
  FormControl,
  TextField
} from "@material-ui/core";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import styles from "./styles";

class CustomDateRangePicker extends React.Component {
  static propTypes = {
    dateFormat: PropTypes.string,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onApply: PropTypes.func,
    label: PropTypes.string
  };

  static defaultProps = {
    dateFormat: "DD/MM/YYYY",
    minDate: undefined,
    maxDate: new Date(),
    startDate: undefined,
    endDate: undefined,
    label: undefined,
    onApply: (startDate, endDate) => {
      console.log("Start date: ", startDate, "End date: ", endDate);
    }
  };

  state = {
    anchorEl: null,
    open: false,
    previewText: "",
    startDate: undefined,
    startDateText: "",
    endDate: undefined,
    endDateText: ""
  };

  formatDate(date) {
    return date ? moment(date).format(this.props.dateFormat) : "";
  }

  parseDate(str) {
    const date = moment(str, this.props.dateFormat, true);

    return date.isValid() ? date.toDate() : undefined;
  }

  updatePreviewText = () => {
    const { startDateText, endDateText } = this.state;
    const previewText =
      startDateText || endDateText
        ? `${startDateText || "Before"} - ${endDateText || "After"}`
        : "";

    this.setState({ previewText });
  };

  componentWillMount() {
    const { startDate, endDate } = this.props;
    const startDateText = this.formatDate(startDate);
    const endDateText = this.formatDate(endDate);

    this.setState({ startDate, startDateText, endDate, endDateText }, () => {
      this.updatePreviewText();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startDate !== this.props.startDate) {
      this.setState(
        {
          startDate: this.props.startDate,
          startDateText: this.formatDate(this.props.startDate)
        },
        () => {
          this.updatePreviewText();
        }
      );
    }

    if (prevProps.endDate !== this.props.endDate) {
      this.setState(
        {
          endDate: this.props.endDate,
          endDateText: this.formatDate(this.props.endDate)
        },
        () => {
          this.updatePreviewText();
        }
      );
    }
  }

  handlePreviewInputClick = e => {
    this.setState({ anchorEl: e.currentTarget, open: true });
  };

  handleDateRangeSelect = ranges => {
    const {
      selection: { startDate, endDate }
    } = ranges;

    const startDateText = this.formatDate(startDate);
    const endDateText = this.formatDate(endDate);

    this.setState({ startDate, startDateText, endDate, endDateText });
  };

  handleApplyButton = () => {
    const { startDate, endDate } = this.state;

    this.setState({ open: false }, () => {
      this.updatePreviewText();
      this.props.onApply(startDate, endDate);
    });
  };

  handleResetButton = () => {
    this.setState({
      startDate: undefined,
      startDateText: "",
      endDate: undefined,
      endDateText: ""
    });
  };

  handleCancelButton = () => {
    const { startDate, endDate } = this.props;
    const startDateText = this.formatDate(startDate);
    const endDateText = this.formatDate(endDate);

    this.setState({
      open: false,
      startDate,
      endDate,
      startDateText,
      endDateText
    });
  };

  render() {
    const { classes } = this.props;
    const intl = this.props.intl;
    const { startDate, endDate } = this.state;

    return (
      <div className={classes.root}>
        <TextField
          label={this.props.label}
          value={this.state.previewText}
          fullWidth={true}
          onClick={this.handlePreviewInputClick}
        />
        <Popover
          className={classes.popoverRoot}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          onClose={this.handleCancelButton}
        >
          <ul className={classes.dateInputWrapper}>
            <li>
              <FormControl>
                <TextField
                  label="From: "
                  value={this.state.startDateText}
                  fullWidth={true}
                  onChange={e => {
                    const { endDate, endDateText } = this.state;
                    let startDate;
                    let startDateText = e.target.value;

                    if (
                      moment(
                        startDateText,
                        this.props.dateFormat,
                        true
                      ).isValid()
                    ) {
                      startDate = this.parseDate(startDateText);

                      if (startDate > endDate) {
                        startDate = endDate;
                        startDateText = endDateText;
                      }

                      if (
                        this.props.minDate &&
                        startDate < this.props.minDate
                      ) {
                        startDate = this.props.minDate;
                        startDateText = this.formatDate(endDate);
                      }

                      if (
                        this.props.maxDate &&
                        startDate > this.props.maxDate
                      ) {
                        startDate = this.props.maxDate;
                        startDateText = this.formatDate(endDate);
                      }
                    }

                    this.setState({ startDate, startDateText });
                  }}
                />
              </FormControl>
            </li>
            <li>
              <FormControl>
                <TextField
                  label={intl.formatMessage({ defaultMessage: "To: "  })}
                  value={this.state.endDateText}
                  fullWidth={true}
                  onChange={e => {
                    const { startDate, startDateText } = this.state;
                    let endDate;
                    let endDateText = e.target.value;

                    if (
                      moment(endDateText, this.props.dateFormat, true).isValid()
                    ) {
                      endDate = this.parseDate(endDateText);

                      if (endDate < startDate) {
                        endDate = startDate;
                        endDateText = startDateText;
                      }

                      if (this.props.minDate && endDate < this.props.minDate) {
                        endDate = this.props.minDate;
                        endDateText = this.formatDate(endDate);
                      }

                      if (this.props.maxDate && endDate > this.props.maxDate) {
                        endDate = this.props.maxDate;
                        endDateText = this.formatDate(endDate);
                      }
                    }

                    this.setState({ endDate, endDateText });
                  }}
                />
              </FormControl>
            </li>
          </ul>
          <DateRangePicker
            showDateDisplay={false}
            months={1}
            inputRanges={[]}
            ranges={[
              {
                startDate,
                endDate: endDate ? endDate : new Date(),
                key: "selection"
              }
            ]}
            dateDisplayFormat={this.props.dateFormat}
            onChange={this.handleDateRangeSelect}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
          />
          <div className={classes.buttonGroup}>
            <Button color="primary" onClick={this.handleApplyButton}>
              {intl.formatMessage({ defaultMessage: "Apply"})} 
            </Button>
            <Button
              className={classes.btnError}
              onClick={this.handleResetButton}
            >
              {intl.formatMessage({ defaultMessage: "Reset"})}
            </Button>
            <Button onClick={this.handleCancelButton}>Cancel</Button>
          </div>
        </Popover>
      </div>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "CustomDateRangePicker" })(
  CustomDateRangePicker
));
