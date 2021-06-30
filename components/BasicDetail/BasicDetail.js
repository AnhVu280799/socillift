import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// custom components
import InfluencingArea from 'components/InfluencingArea/InfluencingArea';
import AvatarProfile from 'components/AvatarProfile/AvatarProfile';
import DetailName from 'components/DetailName/DetailName';
import AboutDetail from 'components/AboutDetail/AboutDetail';

// core components
import RegularCard from 'components/Cards/RegularCard.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import { injectIntl } from 'react-intl';


export const stylesBasic = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  },
  typo: {
    position: 'relative'
  },
  note: {
    fontFamily: 'Nunito',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px'
  }
});

export const BasicDetail = ({
  id,
  name,
  maritalStatus,
  platformDetail,
  basicInfo,
  phoneNumber,
  jobs,
  email,
  photoUrl,
  categories,
  editButton,
  addCollectionButton,
  intl
  
}) => (
  
  <div>

    <RegularCard
      content={(
        <GridContainer>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <AvatarProfile photoUrl={photoUrl} />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={4}>
            <DetailName
              name={name}
              platformDetail={platformDetail}
              id={id}
              editButton={editButton}
            />
            <AboutDetail contents={jobs} />
            <AboutDetail contents={basicInfo} />
            <p>
              
             {intl.formatMessage({ defaultMessage: "Marital Status:"})}
              {maritalStatus}
            </p>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={2}>
            <InfluencingArea categories={categories} />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            {intl.formatMessage({ defaultMessage: "addCollectionButton"})}
          </ItemGrid>
        </GridContainer>
      )}
    />
  </div>
);

BasicDetail.propTypes = {};

export default injectIntl(withStyles(stylesBasic)(BasicDetail));
