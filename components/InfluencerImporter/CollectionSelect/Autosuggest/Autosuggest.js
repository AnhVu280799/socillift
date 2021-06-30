import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import clsx from "clsx";

import {
  withStyles,
  Chip,
  Paper,
  Input,
  Typography,
  List,
  ListItem
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import { injectIntl } from 'react-intl';
import TagsInput from "react-tagsinput";

import styles from "./styles";

class Autosuggest extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: "Enter keyword"
  };

  state = {
    inputText: "",
    filteredItems: [],
    selectedItem: null
  };

  selectedItemRef = null;

  get tagsInputValue() {
    const { value, options } = this.props;

    const tmp = options.reduce((obj, { label, value }) => {
      obj[value] = label;

      return obj;
    }, {});

    return value.map(elm => tmp[elm]);
  }

  filterItems = input => {
    const { options, value } = this.props;

    const items = !!input
      ? options.filter(
          option =>
            option.label.toLowerCase().startsWith(input.toLowerCase()) &&
            !value.includes(option.value)
        )
      : [];

    return _.uniq(items, "name");
  };

  handleChangeInput = value => {
    const filteredItems = this.filterItems(value);
    const selectedItem = filteredItems.length ? 0 : null;

    this.setState({ inputText: value, filteredItems, selectedItem });
  };

  handleChangeTags = items => {
    const { options } = this.props;

    const tmp = options.reduce((obj, { label, value }) => {
      obj[label] = value;

      return obj;
    }, {});

    const value = items.map(elm => tmp[elm]);

    this.props.onChange(value);
  };

  handleSuggestClick = item => {
    if (!item) return;

    const { value } = this.props;
    const newValue = _.uniq([...value, item.value]);

    this.setState(
      { inputText: "", filteredItems: [], selectedItem: null },
      () => {
        this.props.onChange(newValue);
      }
    );
  };

  handleClearInput = () => {
    this.props.onChange([]);
  };

  handleArrowKeys = e => {
    const { selectedItem, filteredItems } = this.state;

    switch (e.keyCode) {
      case 9:
      case 13:
        e.preventDefault();
        e.stopPropagation();

        const item = filteredItems[selectedItem];

        this.handleSuggestClick(item);
        break;

      case 38:
        e.preventDefault();
        e.stopPropagation();

        if (selectedItem > 0) {
          this.setState({ selectedItem: selectedItem - 1 }, () => {
            this.selectedItemRef.scrollIntoView({ smooth: true });
          });
        }
        break;

      case 40:
        e.preventDefault();
        e.stopPropagation();

        if (selectedItem < filteredItems.length - 1) {
          this.setState({ selectedItem: selectedItem + 1 }, () => {
            this.selectedItemRef.scrollIntoView({ smooth: true });
          });
        }
        break;

      default: // nothing
    }
  };

  renderTag = ({
    key,
    tag,
    getTagDisplayValue,
    onRemove,
    disabled,
    className,
    classNameRemove
  }) => {
    const { classes } = this.props;

    return (
      <Chip
        key={key}
        className={className}
        classes={{
          root: classes.chipRoot,
          label: classes.chipLabel,
          deleteIcon: classNameRemove
        }}
        label={getTagDisplayValue(tag)}
        deleteIcon={<CancelIcon />}
        onDelete={() => onRemove(key)}
      />
    );
  };

  renderInput({ value, onChange, addTag, placeholder, className, ...others }) {
    return (
      <Input
        disableUnderline
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        {...others}
      />
    );
  }

  renderLayout = (tagComponents, inputComponent) => {
    const { classes, value } = this.props;  const intl = this.props.intl; 

    return (
      <React.Fragment>
        <div className={classes.tagsWrapper}>
          {intl.formatMessage({ defaultMessage: "tagComponents"})}
          {intl.formatMessage({ defaultMessage: "inputComponent"})}
        </div>
        <ClearIcon
          className={clsx({
            [classes.clearButton]: true,
            [classes.hidden]: !value.length
          })}
          onClick={this.handleClearInput}
        />
      </React.Fragment>
    );
  };

  renderSuggestList = () => {
    const { classes } = this.props;
    const { filteredItems, selectedItem, inputText } = this.state;

    return (
      <List dense className={classes.list}>
        {filteredItems.map((item, index) => (
          <ListItem
            button
            dense
            key={index}
            buttonRef={element => {
              if (selectedItem === index) {
                this.selectedItemRef = element;
              }
            }}
            classes={{
              selected: classes.itemSelected
            }}
            selected={selectedItem === index}
            onClick={() => this.handleSuggestClick(item)}
          >
            {inputText}
            <span className={classes.textBold}>
              {item.label.replace(inputText, "")}
            </span>
          </ListItem>
        ))}
      </List>
    );
  };

  render() {
    const { classes, placeholder } = this.props;  const intl = this.props.intl;
    const { inputText } = this.state;

    return (
      <Paper className={classes.root} onKeyDown={this.handleArrowKeys}>
        <TagsInput
          onlyUnique
          addKeys={[]}
          className={classes.inputWrapper}
          value={this.tagsInputValue}
          onChange={this.handleChangeTags}
          inputValue={inputText}
          onChangeInput={value => this.handleChangeInput(value)}
          tagProps={{
            className: classes.inputChip,
            classNameRemove: classes.removeIcon
          }}
          inputProps={{
            className: classes.inputRoot,
            placeholder: placeholder
          }}
          renderTag={this.renderTag}
          renderInput={this.renderInput}
          renderLayout={this.renderLayout}
        />
        <Typography className={classes.titleSuggest}>{intl.formatMessage({ defaultMessage: "Suggestions"})}</Typography>
        {this.renderSuggestList()}
      </Paper>
    );
  }
}

export default injectIntl (withStyles(styles, { name: "Autosuggest" })(Autosuggest)) ;
