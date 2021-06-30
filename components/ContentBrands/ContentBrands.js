import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Delete from '@material-ui/icons/Delete';
import ModeEdit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { injectIntl } from 'react-intl';

// custom components
import contentBrandsStyle from "assets/jss/material-dashboard-pro-react/components/contentBrandsStyle.jsx"

import DotDotDot from 'react-dotdotdot';

class ContentBrands extends React.Component {
  render() {
    const { classes, collections, onClickEdit, onClickShare, onClickDelete } = this.props;
    const intl= this.props.intl;
    return (
      <GridContainer className={classes.gridContainerCustom}>
        <div className={classes.divTable}>
          <div className={classes.divTableHeading}>
            <div className={classes.divTableHeadingRow}>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "BRAND NAME"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "KEYWORDS"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "RELATED CATEGORIES"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "DESCRIPTION"})}</div>
              <div className={classes.divTableHead}>{intl.formatMessage({ defaultMessage: "ACTIONS"})}</div>
            </div>
          </div>
          <div className={classes.divTableBody}>
            {
              collections && collections.map(({ id, brandName, imageURL, description, categoryName, keywords }, idx) => (
                <div className={classes.divTableRow} key={idx}>
                  <div className={classes.divTableCell + " " + classes.name}>
                    <div className={classes.divTableBrandName}>
                      <img src={imageURL} className={classes.postImage} />
                      {intl.formatMessage({ defaultMessage: "brandName"})}
                    </div>
                  </div>
                  <div className={classes.divTableCell}>{intl.formatMessage({ defaultMessage: "keywords"})}</div>
                  <div className={classes.divTableCellCategories}>{intl.formatMessage({ defaultMessage: "categoryName"})}</div>
                  <div className={classes.divTableCell}><DotDotDot clamp={5}>{intl.formatMessage({ defaultMessage: "description"})}</DotDotDot></div>
                  <div className={classes.divTableCell}>
                    <IconButton
                      key="edit"
                      onClick={() => onClickEdit(idx)}
                      classes={{
                        root: classes.button
                      }}
                    >
                      <ModeEdit />
                    </IconButton>
                    <IconButton
                      key="delete"
                      onClick={() => onClickDelete(idx)}
                      classes={{
                        root: classes.button
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </GridContainer>
    );
  }
}

ContentBrands.propTypes = {
};
export default injectIntl(withStyles(contentBrandsStyle)(ContentBrands)) ;
