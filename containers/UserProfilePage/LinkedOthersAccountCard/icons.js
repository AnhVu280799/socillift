import React from "react";
import { withStyles, Icon } from "@material-ui/core";

import facebookIcon from "assets/img/facebook.svg";
import fanpageIcon from "assets/img/flag_variant.svg";
import youtubeIcon from "assets/img/youtube.svg";
import instagramIcon from "assets/img/instagram.svg";

const styles = {
  imageIcon: {
    height: "100%",
    verticalAlign: "unset"
  },
  iconRoot: {
    textAlign: "center"
  }
};

const SvgIconBase = ({ classes, svgSrc, ...rest }) => (
  <Icon classes={{ root: classes.iconRoot }}>
    <img className={classes.imageIcon} src={svgSrc} />
  </Icon>
);

const SvgIcon = withStyles(styles, { name: "SvgIcon" })(SvgIconBase);

export const FacebookIcon = ({ ...rest }) => (
  <SvgIcon svgSrc={facebookIcon} {...rest} />
);
export const FanpageIcon = ({ ...rest }) => (
  <SvgIcon svgSrc={fanpageIcon} {...rest} />
);
export const YoutubeIcon = ({ ...rest }) => (
  <SvgIcon svgSrc={youtubeIcon} {...rest} />
);
export const InstagramIcon = ({ ...rest }) => (
  <SvgIcon svgSrc={instagramIcon} {...rest} />
);
