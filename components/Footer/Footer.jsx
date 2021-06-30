import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { injectIntl } from 'react-intl';
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, white, rtlActive,intl } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={block}>
                {rtlActive ? intl.formatMessage({ defaultMessage: "الصفحة الرئيسية"}) : intl.formatMessage({ defaultMessage: "Home"})}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={block}>
                {rtlActive ? intl.formatMessage({ defaultMessage: "شركة"}) : intl.formatMessage({ defaultMessage: "Company"})}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                {rtlActive ? intl.formatMessage({ defaultMessage: "بعدسة"}) : intl.formatMessage({ defaultMessage: "Portfolio"})}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                {rtlActive ? intl.formatMessage({ defaultMessage: "مدونة" }): intl.formatMessage({ defaultMessage: "Blog"})}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://www.creative-tim.com" className={anchor}>
            {rtlActive ? intl.formatMessage({ defaultMessage: "توقيت الإبداعية"}) : intl.formatMessage({ defaultMessage: "Creative Tim"})}
          </a>
          {rtlActive
            ? intl.formatMessage({ defaultMessage: ", مصنوعة مع الحب لشبكة الإنترنت أفضل"})
            : intl.formatMessage({ defaultMessage: ", made with love for a better web"})}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default injectIntl(withStyles(footerStyle)(Footer));
