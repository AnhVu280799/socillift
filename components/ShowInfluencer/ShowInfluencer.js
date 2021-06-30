import React from 'react';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Pagination from 'components/Pagination/Pagination.jsx';
import InfluencerProfile from 'components/InfluencerProfile';
import ItemGrid from 'components/Grid/ItemGrid.jsx';

export const ShowInfluencer = ({
  influencerList,
  selectedInfluencers,
  pages,
  showOverlay,
  onSelect,
  goToUrl,
  mode
}) => (
  <GridContainer>
    {influencerList &&
      influencerList.map(
        ({
          photoUrl,
          id,
          name,
          categories,
          avgInfluenceScore,
          platformDetail: {
            fb: { totalFollowers, avgEngagement, reachFollowers }
          }
        }) => (
          <ItemGrid
            xs={12}
            sm={12}
            md={4}
            lg={3}
            key={id}
            style={{ marginTop: '30px', textAlign: 'center' }}
          >
            <InfluencerProfile
              avatar={photoUrl}
              title={name}
              showOverlay={showOverlay}
              verticals={
                categories ? categories.map(v => v.categoryName) : []
              }
              total_follower={
                (typeof (reachFollowers) !== 'undefined')
                  ? (reachFollowers === 0)
                    ? 'N/A'
                    : reachFollowers
                  : totalFollowers
              }
              avg_engagement={Math.round(avgEngagement)}
              avg_influence={avgInfluenceScore}
              onSelect={({ target: { checked } }) => onSelect(id, checked)}
              checked={
                mode === 2
                  ? !selectedInfluencers[id]
                  : mode === 1
                    ? !!selectedInfluencers[id]
                    : false
              }
              goToUrl={`${goToUrl}/${id}`}
            />
          </ItemGrid>
        )
      )}
    <ItemGrid xs={12} sm={12} lg={12} md={12}>
      <Pagination pages={pages} />
    </ItemGrid>
  </GridContainer>
);

export default ShowInfluencer;