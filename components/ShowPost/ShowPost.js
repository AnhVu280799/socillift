import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import RegularCard from 'components/Cards/RegularCard';
import GridList from '@material-ui/core/GridList';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import SOCIAL_URL from 'constants/socialURL';
import { injectIntl } from 'react-intl';
export const stylesBasic = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    transform: 'translateZ(0)'
  },
  title: {
    color: '#0010101'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
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
  chip: {
    marginTop: '10px',
    marginRight: '5px'
  }
});

export const ShowPost = ({
  classes,
  postId,
  createdTime,
  postContent,
  listCategories,
  listImages,
  totalEngagements,
  totalLikes,
  totalShares,
  totalComments,
  addCategoryFunction,
  deleteClick,
  onClickIrrelevant,
  intl
}) => (
  <GridContainer>
    <ItemGrid xs={12} sm={6} md={6} lg={12}>
      <RegularCard
        content={(
          <GridContainer>
            <ItemGrid xs={12} sm={6} md={6} lg={7}>
              <h4 style={{ textAlign: 'left' }}>
                 {intl.formatMessage({ defaultMessage: "Date time:"})}
                {' '}
                {createdTime}
              </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={2} md={2} lg={5}>
              <Button
                size="sm"
                customClass={classes.marginRight}
                onClick={onClickIrrelevant}
                color="github"
              >
                {intl.formatMessage({ defaultMessage: "Irrelevance"})}
              </Button>
              <Button
                size="sm"
                customClass={classes.marginRight}
                color="github"
                href={`${SOCIAL_URL.fb}\\${postId}`}
                target="_blank"
              >
                {intl.formatMessage({ defaultMessage: "Facebook Link"})}
              </Button>
              <Button
                size="sm"
                customClass={classes.marginRight}
                onClick={addCategoryFunction}
                color="github"
              >
                {intl.formatMessage({ defaultMessage: "Add Category"})}
              </Button>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={3}>
              <h4 style={{ textAlign: 'left' }}>
                {intl.formatMessage({ defaultMessage: "Total Eng:"})}
                {' '}
                {totalEngagements
                  ? totalEngagements.toLocaleString('en')
                  : 0}
              </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={3}>
              <h4 style={{ textAlign: 'left' }}>
                 {intl.formatMessage({ defaultMessage: "Likes:"})}
                {' '}
                {totalLikes ? totalLikes.toLocaleString('en') : 0}
              </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={3}>
              <h4 style={{ textAlign: 'left' }}>
                 {intl.formatMessage({ defaultMessage: "Shares:"})}
                {' '}
                {totalShares ? totalShares.toLocaleString('en') : 0}
              </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={3}>
              <h4 style={{ textAlign: 'left' }}>
               {intl.formatMessage({ defaultMessage: " Comments:"})}
                {' '}
                {totalComments ? totalComments.toLocaleString('en') : 0}
              </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={6} lg={12}>
              <h4
                style={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-all',
                  textAlign: 'left'
                }}
              >
                {postContent || 'N/A'}
              </h4>
            </ItemGrid>
            {listImages && (listImages.length > 0) && (
              <ItemGrid xs={12} sm={6} md={6} lg={12}>
                <div className={classes.root}>
                  <GridList style={{ flexWrap: 'nowrap' }} cols={1.5}>
                    {listImages.map((image, idx) => (
                      <GridList key={idx} style={{ overflowY: 'hidden' }}>
                        <img
                          src={image.img}
                          alt={image.title}
                          style={{ width: '100%', maxWidth: '250px' }}
                        />
                      </GridList>
                    ))}
                  </GridList>
                </div>
              </ItemGrid>
            )}
            <ItemGrid
              xs={12}
              sm={6}
              md={6}
              lg={12}
              style={{
                textAlign: 'left',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {listCategories && listCategories.map((cat, idx) => (
                <Chip
                  key={idx}
                  label={`${cat.name}: ${cat.score}`}
                  onDelete={() => deleteClick(cat)}
                  className={classes.chip}
                />
              ))}
            </ItemGrid>
          </GridContainer>
        )}
        contentAlign="center"
      />
    </ItemGrid>
  </GridContainer>
);

ShowPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl (withStyles(stylesBasic)(ShowPost));
