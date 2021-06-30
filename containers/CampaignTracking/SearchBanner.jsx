import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { injectIntl } from 'react-intl';
// custom components
import Card from "components/Card/Card.jsx";
import ButtonInf from "components/CustomButtons/ButtonInf";

// styles
import searchBannerStyle from "./SearchBannerStyle";

// utils
import { normalizeHashtag } from "./util.js";

// tracker GA
import Tracker from "apis/tracker";

// constants
import errorImages from "constants/errorImages";

const DISCOVER_BANNER =
  "https://storage.googleapis.com/yn-influencer/discover%20frontpage%20banner%20bg.jpg";

const SuggestionTag = props => {
  const { hashtag, onClick, classes } = props;
  const intl = props.intl;

  return (
    <Button
      onClick={() => {
        onClick(hashtag);
      }}
      className={classes.suggestionHashtag}
    >
      <p className={classes.hashtagName}>{intl.formatMessage({ defaultMessage: "#hashtag"})}</p>
    </Button>
  );
};

class SearchBanner extends React.Component {
  onTagClicked = value => {
    value = normalizeHashtag(value);

    Tracker.event("influencer-tracking", "click-suggestion", value);

    this.props.onChangeHashtag(value);
    this.props.onSearch(value);
  };

  render() {
    const {
      classes,
      className,
      suggestionTagList,
      onClickSuggestion,
      offUpdateTextSearch,
      ...props
    } = this.props;
    const intl = this.props.intl;

    return (
      <Card className={classNames(classes.card, className)}>
        <img
          className={classes.cardImgTop}
          src={DISCOVER_BANNER}
          data-holder-rendered="true"
          onError={error => {
            error.target.src = errorImages.frontPageDefault;
          }}
        />
        <div className={classes.divImg}></div>
        <p className={classes.bannerText}>
        {intl.formatMessage({ defaultMessage: "Input any Hashtag to see the overall performance of Influencers that"})}
        {intl.formatMessage({ defaultMessage: "related"})}
        </p>
        <div className={classes.inputContainer}>
          <Input
            classes={{
              root: classes.inputRoot,
              input: classes.input,
              focused: classes.inputFocus
            }}
            disableUnderline
            startAdornment={<span className={classes.defaultHastag}>{intl.formatMessage({ defaultMessage: "#"})}</span>}
            endAdornment={
              <InputAdornment classes={{ root: classes.inputAdornmentRoot }}>
                <ButtonInf
                  // round="true"
                  color="primary"
                  className={classes.searchButton}
                  onClick={() => {
                    Tracker.event(
                      intl.formatMessage({ defaultMessage: "influencer-tracking"}),
                      intl.formatMessage({ defaultMessage: "icon-search"}),
                      this.props.hashtag
                    );

                    this.props.onSearch(this.props.hashtag);
                  }}
                >
                  <Icon className={classes.searchIcon}>search</Icon>
                </ButtonInf>
              </InputAdornment>
            }
            placeholder={intl.formatMessage({ defaultMessage: "Please input only 1 hashtag"})}
            value={this.props.hashtag}
            onChange={({ target: { value } }) =>
              this.props.onChangeHashtag(value)
            }
            onKeyDownCapture={e => {
              if (e.keyCode === 13) {
                Tracker.event(
                  intl.formatMessage({ defaultMessage: "influencer-tracking"}),
                  intl.formatMessage({ defaultMessage: "enter-search"}),
                  this.props.hashtag
                );

                this.props.onSearch(this.props.hashtag);
              }
            }}
          />
        </div>
        <div className={classes.suggestContainerAbsolute}>
          <Grid
            container
            item
            direction="row"
            className={classes.suggestContainer}
          >
            <Grid
              container
              item
              direction="column"
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.suggestTitle}
            >
             {intl.formatMessage({ defaultMessage: "Suggested hashtags:"})} 
              <Grid container item className={classes.suggestTagContainer}>
                {suggestionTagList.map((hashtag, index) => (
                  <SuggestionTag
                    key={index}
                    hashtag={hashtag}
                    onClick={this.onTagClicked}
                    classes={classes}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  }
}

SearchBanner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(searchBannerStyle)(SearchBanner));
