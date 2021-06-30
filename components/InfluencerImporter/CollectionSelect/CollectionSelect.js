import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Autosuggest from "./Autosuggest";
import LoadingScreen from "components/LoadingScreen";
import Button from "components/CustomButtons/ButtonInf";
import { injectIntl } from 'react-intl';
import styles from "./styles";

class CollectionSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    listCollections: PropTypes.array.isRequired,
    onFetchData: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    onAddCollection: PropTypes.func.isRequired
  };

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleFetchData();
  }

  handleFetchData = () => {
    this.setState({ isLoading: true });
    this.props.onFetchData().then(() => {
      this.setState({ isLoading: false });
    });
  };

  handleChange = selectedCollections => {
    this.props.onChange(selectedCollections);
  };

  handleAddCollection = () => {
    this.props.onAddCollection();
  };

  render() {
    const { classes, listCollections, value } = this.props;
    const intl = this.props.intl;
    const { isLoading } = this.state;

    return (
      <div className={classes.root}>
        <Typography className={classes.title}>{intl.formatMessage({ defaultMessage: "Collections Select"})}</Typography>
        <div className={clsx(classes.inline, classes.firstBlock)}>
          <Typography>{intl.formatMessage({ defaultMessage: "Enter Collection Name"})}</Typography>
          <Button round color="primary" onClick={this.handleAddCollection}>
            <AddIcon className={classes.buttonIcon} />
            {intl.formatMessage({ defaultMessage: "New Collection"})} 
          </Button>
        </div>
        <div className={classes.selectWrapper}>
          <LoadingScreen
            open={isLoading}
            classes={{
              container: classes.loading,
              loadingIcon: classes.loadingIcon
            }}
          />
          <Autosuggest
            disabled
            value={value}
            onChange={this.handleChange}
            options={listCollections}
            placeholder={intl.formatMessage({ defaultMessage: "Enter collection name"})}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(styles, { name: "CollectionSelect" })(
  CollectionSelect
));
