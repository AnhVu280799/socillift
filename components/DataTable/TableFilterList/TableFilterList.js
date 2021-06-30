import * as React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { injectIntl } from 'react-intl';
import {
  Template,
  Plugin,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

import { withStyles, Chip, Button } from "@material-ui/core";

import styles from "./styles";

class TableFilterList extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onReset: PropTypes.func.isRequired,
    onRemoveFilter: PropTypes.func.isRequired,
    search: PropTypes.string,
    onRemoveSearch: PropTypes.func
  };

  prepareData = () => {
    const result = Object.keys(this.props.filters).reduce((arr, key) => {
      const options = this.props.options.find(({ name }) => name === key);
      const column = this.props.columns.find(({ name }) => name === key);

      if (!options || !column || !this.props.filters[key]) return arr;

      switch (options.type) {
        case "select":
          {
            const value = this.props.filters[key];
            const found = options.options.find(elm => elm.value === value);

            if (found) {
              arr.push({
                title: `${column.title}: ${found.label}`,
                onRemove: () => {
                  this.props.onRemoveFilter(key, options.type, value);
                }
              });
            }
          }
          break;

        case "multiselect":
          {
            const arrValue = this.props.filters[key];

            arrValue.forEach(value => {
              const found = options.options.find(elm => elm.value === value);

              if (found) {
                arr.push({
                  title: `${column.title}: ${found.label}`,
                  onRemove: () => {
                    this.props.onRemoveFilter(key, options.type, value);
                  }
                });
              }
            });
          }
          break;

        case "dateRange":
          {
            const dateFormat = "DD/MM/YYYY";
            let { from, to } = this.props.filters[key];

            if (from || to) {
              from = from ? moment(from).format(dateFormat) : "Before";
              to = to ? moment(to).format(dateFormat) : "After";
              arr.push({
                title: `${column.title}: ${from} - ${to}`,
                onRemove: () => {
                  this.props.onRemoveFilter(
                    key,
                    options.type,
                    this.props.filters[key]
                  );
                }
              });
            }
          }
          break;

        case "text":
          {
            const value = this.props.filters[key];

            arr.push({
              title: `${column.title}: ${value}`,
              onRemove: () => {
                this.props.onRemoveFilter(key, options.type, value);
              }
            });
          }
          break;

        default:
        // nothing
      }

      return arr;
    }, []);

    const { search, onRemoveSearch } = this.props;

    if (search && onRemoveSearch) {
      result.push({ title: `Search: ${search}`, onRemove: onRemoveSearch });
    }

    return result;
  };

  renderContent = () => {
    const { classes } = this.props;
    const intl = this.props.intl;
    const filters = this.prepareData();

    return (
      <>
        {filters.map((elm, index) => (
          <Chip
            key={index}
            className={classes.chip}
            label={elm.title}
            onDelete={elm.onRemove}
          />
        ))}
        {!!filters.length && (
          <Button className={classes.buttonReset} onClick={this.props.onReset}>
             {intl.formatMessage({ defaultMessage: "Reset"})}
          </Button>
        )}
      </>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Plugin name="TableFilterList">
        <Template name="header">
          <TemplatePlaceholder />
          <div className={classes.root}>{this.renderContent()}</div>
        </Template>
      </Plugin>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "TableFilterList" })(TableFilterList));
