import React from 'react';
import style from './MostEngagementPostStyle';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import DotDotDot from 'react-dotdotdot';
import { Grid, Paper, Icon } from "@material-ui/core";
import cx from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import {
  parseKMB,
} from 'utils';

class MostEngagementPost extends React.Component {
  render() {
    const {
      classes, theme, totalEngagements,
      postPhotos, postType, postMessage,
      postCreatedTime, postLink,  ...props } = this.props;
      const intl = this.props.intl;
    const namePostIcon = {
      'status': 'format_quote',
      'photo': 'collections_outlined',
      'video': 'videocam',
      'link': 'insert_link',
      'event': 'event',
      'note': 'note',
    };
    const postIcon = postType ? namePostIcon[postType] : namePostIcon['status']
    const numOfImage = postPhotos ? postPhotos.length : 0
    const styleOverplayVideo = cx(
      classes.overlay,
      {
        [classes.overlayVideo]: (postType === 'video'),
        [classes.postNonImage]: (numOfImage <= 0),
      }
    )
    const styleCreatedTime = cx(
      classes.postCreatedTime,
      {
        [classes.postCreatedTimeNonContent]: (typeof postMessage === 'undefined' || postMessage.length === 0),
      }
    )
    const PostType = (props) => {
      const stylePost = cx(
        classes.ellipsePostType,
        classes.post,
        {
          [classes.postStatus]: postType === 'status',
          [classes.postPhoto]: postType === 'photo',
          [classes.postVideo]: postType === 'video',
          [classes.postLink]: postType === 'link',
          [classes.postEvent]: postType === 'event',
          [classes.postNote]: postType === 'note'
        }
      )
      return (
        <Grid item container className={stylePost} alignItems='center' justify='center'>
          <a target='_blank' href={props.link} className={classes.iconPostType}>
            <Icon className={classes.iconPostType}>{props.icon}</Icon>
          </a>
        </Grid>
      );
    }
    return (
      <Paper className={classes.paperSize}>
        <Grid item container direction='column' xs={12} className={classes.postContainer}>
            <Grid item direction='row'
              alignItems='center' justify='center'
              className={classes.totalEngagementsTitle}>
              {intl.formatMessage({ defaultMessage: "Total Engagement"})}
            </Grid>
            <Grid item direction='row'
              alignItems='center' justify='center'
              className={classes.totalEngagementsValue}>
              <PostType icon={postIcon} link={postLink} postType={postType} />
              { 
                (typeof totalEngagements === 'number' ?
                (
                  totalEngagements > 1000000 ?
                  (
                    <Tooltip title={totalEngagements.toLocaleString('en')} classes={{ tooltip: classes.tooltipTitle}}>
                      <div>
                        {parseKMB(totalEngagements)}
                      </div>
                    </Tooltip>
                  ):
                  (totalEngagements.toLocaleString('en'))
                ) :
                ('N/A'))
              }
            </Grid>
            {
              postPhotos && numOfImage > 0 &&
              (<Grid item direction='row'
                alignItems='center' justify='center'
                className={classes.postMedia}>   
                  <img src={postPhotos[0] ? postPhotos[0] : ''} alt={intl.formatMessage({ defaultMessage: 'Can not load image...'})} className={classes.postImage} /> 
                  {
                    (numOfImage > 1 && postType !== 'video') &&
                    (
                      <Grid item container className={classes.overlayExtNumImage} alignItems='center' justify='center'>
                        <Grid item className={classes.extNumImage} alignItems='center' justify='center'>
                          {numOfImage.toString() + ' photos'}
                        </Grid>
                      </Grid>
                    )        
                  }
                  {
                    (postType === 'video') &&
                    (
                      <Grid item container className={styleOverplayVideo} alignItems='center' justify='center'>
                        <Icon className={classes.playIcon}>{intl.formatMessage({ defaultMessage: "play_circle_outline"})}</Icon>
                      </Grid>
                    )        
                  }
              </Grid>)
            }
            {
              postPhotos && numOfImage > 0 ?
              (postMessage && <Grid item direction='row'
                alignItems='center' justify='flex-start'
                className={classes.postMessagePhoto}>
                <DotDotDot clamp={'2'}>{postMessage}</DotDotDot>
              </Grid>) :
              (postMessage && <Grid item direction='row'
                alignItems='center' justify='flex-start'
                className={classes.postMessageNonPhoto}>
                <DotDotDot clamp={'8'}>{postMessage}</DotDotDot>
              </Grid>)
            }
            <Grid item direction='row'
              alignItems='flex-start' justify='flex-start'
              className={styleCreatedTime}>
              {postCreatedTime}
            </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default injectIntl (
  withTheme()(withStyles(style)(MostEngagementPost))
) ;
