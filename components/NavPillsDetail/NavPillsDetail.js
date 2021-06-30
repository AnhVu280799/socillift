import React from 'react';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// import Typography from '@material-ui/core/Typography';

// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment';
import { injectIntl } from 'react-intl';
// core components
import RegularCard from 'components/Cards/RegularCard.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import NavPills from 'components/NavPills/NavPills.jsx';
import Table from 'components/Table/Table.jsx';
import IconCard from 'components/Cards/IconCard.jsx';
// import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress.jsx';
import Button from 'components/CustomButtons/Button';

// Import custom components
import Demographic from 'components/Demographic/Demographic';
import RecentPosts from 'components/RecentPosts';

import { parseFloatNumberString } from 'utils';

const styles = {
  noOverFlow: {
    overflow: 'hidden'
  },
  statisticsResults: {
    height: '80px'
  },
  zeroMarginTop: {
    marginTop: '0px'
  }
};

export const ReachScoreCardIcon = (reachScore, intl) => (
  <h6 style={{ color: 'white' }}>
    {intl.formatMessage({ defaultMessage: "Reach Score"})}
    {' '}
    <Button color="github" size="sm" style={{ pointerEvents: intl.formatMessage({ defaultMessage: 'none'}) }}>
      {reachScore}
    </Button>
  </h6>
);
export const PostsCardIcon = () => <h6 style={{ color: 'white' }}>Posts</h6>;
export const EngagementsCardIcon = engagementScore => (
  <h6 style={{ color: 'white' }}>
    {intl.formatMessage({ defaultMessage: "Engagements Score"})}
    {' '}
    <Button color="github" size="sm" style={{ pointerEvents: intl.formatMessage({ defaultMessage: 'none'}) }}>
      {engagementScore}
    </Button>
  </h6>
);

export const NavPillsDetail = ({
  resonances,
  platformDetails,
  recentPosts,
  trueResonance,  
  influenceScore,
  callBackActiveFunction,
  intl
}) => (
  <div>
    <RegularCard
      content={(
        <NavPills
          color="info"
          callBackActive={callBackActiveFunction}
          slideStyle={{ overflow: 'hidden' }}
          tabs={[
            {
              tabButton: 'PERSONAL',
              tabContent: (
                  <IconCard
                    icon={Assignment}
                    iconColor="blue"
                    title={intl.formatMessage({ defaultMessage: "Influence Score By Category"})}
                    category={intl.formatMessage({ defaultMessage: "  Key Audience Interests"})}
                    plain
                    content={(
                      <Table
                        hover
                        tableHead={[
                          'Category',
                          'Influence Score',
                          'Relevance Score',
                          'Resonance Score'
                        ]}
                        tableData={
                          resonances ?
                            Object.keys(resonances).map((resonance) => (
                              [
                                <Button color="reddit" style={{ pointerEvents: intl.formatMessage({ defaultMessage: 'none'}) }}>
                                  {resonance}
                                </Button>,
                                <h5>{influenceScore[resonance] ? influenceScore[resonance] : intl.formatMessage({ defaultMessage: 'N/A'})}</h5>,
                                <h5>{resonances[resonance]}</h5>,
                                <h5>{trueResonance[resonance] ? trueResonance[resonance] : intl.formatMessage({ defaultMessage: 'N/A'})}</h5>
                              ]
                            )) : []
                        }
                      />
                    )}
                  />
              )
            },
            {
              tabButton: 'METRICS',
              tabContent: (
                <div/>
                // <GridContainer justify="center">
                //   <ItemGrid xs={12} sm={12} md={12}>
                //     {/* <RegularCard
                //       plainCard
                //       content={(
                //         <GridContainer>
                //           <ItemGrid xs={12} sm={6} md={6} lg={6}>
                //             <IconCard
                //               icon={() => ReachScoreCardIcon(
                //                 platformDetails.fb.reachRate
                //                   ? platformDetails.fb.reachRate
                //                   : 'N/A'
                //               )}
                //               iconColor="blue"
                //               content={(
                //                 <GridContainer>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb
                //                           .totalFollowers &&
                //                             platformDetails.fb.totalFollowers.toLocaleString(
                //                               'en'
                //                             )}
                //                       </h3>
                //                       <h6>Total Followers</h6>
                //                     </div>
                //                   </ItemGrid>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb
                //                           .followerGrowth &&
                //                             platformDetails.fb.followerGrowth.toLocaleString(
                //                               'en'
                //                             )}
                //                         {' '}
                //                           (
                //                         {parseFloatNumberString(
                //                           platformDetails.fb
                //                             .followerGrowthByPercentage *
                //                             100,
                //                           2
                //                         )} %)
                //                       </h3>
                //                       <h6>Followers Growth (Last 4W) </h6>
                //                     </div>
                //                   </ItemGrid>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb
                //                           .followerInactivePercent ? 
                //                             platformDetails.fb.followerInactivePercent.toLocaleString(
                //                               'en'
                //                             ) : 'N/A'} %
                //                       </h3>
                //                       <h6>Percent Followers Inactive</h6>
                //                     </div>
                //                   </ItemGrid>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb
                //                           .interactionInactivePercent ?
                //                             platformDetails.fb.interactionInactivePercent.toLocaleString(
                //                               'en'
                //                             ) : 'N/A'} %
                //                       </h3>
                //                       <h6>Percent Interaction Inactive</h6>
                //                     </div>
                //                   </ItemGrid>
                //                 </GridContainer>
                //               )}
                //             />
                //             <IconCard
                //               icon={PostsCardIcon}
                //               iconColor="blue"
                //               category="Last 4 weeks"
                //               content={(
                //                 <GridContainer>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb.totalPosts &&
                //                             platformDetails.fb.totalPosts.toLocaleString('en')}
                //                       </h3>
                //                       <h6>Posts</h6>
                //                     </div>
                //                   </ItemGrid>
                //                   <ItemGrid xs={12} sm={12} md={12} lg={6}>
                //                     <div>
                //                       <h3>
                //                         {platformDetails.fb
                //                           .avgEngagement &&
                //                             parseInt(
                //                               platformDetails.fb
                //                                 .avgEngagement,
                //                               10
                //                             ).toLocaleString('en')}
                //                       </h3>
                //                       <h6>Average Engagement/Post</h6>
                //                     </div>
                //                   </ItemGrid>
                //                 </GridContainer>
                //               )}
                //             />
                //           </ItemGrid>
                //           <ItemGrid xs={12} sm={6} md={6} lg={6}>
                //             <IconCard
                //               icon={() => EngagementsCardIcon(
                //                 platformDetails.fb.engagementRate
                //                   ? platformDetails.fb.engagementRate
                //                   : 'N/A'
                //               )}
                //               iconColor="blue"
                //               category="Last 4 weeks"
                //               content={(
                //                 <div>
                //                   <RegularCard
                //                     contentAlign="center"
                //                     content={(
                //                       <div>
                //                         <h2>
                //                           {platformDetails.fb
                //                             .totalReactions &&
                //                               platformDetails.fb
                //                                 .totalComments &&
                //                               platformDetails.fb
                //                                 .totalShares &&
                //                               (
                //                                 platformDetails.fb
                //                                   .totalReactions +
                //                                 platformDetails.fb
                //                                   .totalComments +
                //                                 platformDetails.fb
                //                                   .totalShares
                //                               ).toLocaleString('en')}
                //                         </h2>
                //                         <h4>Total Engagements</h4>
                //                         <h5>
                //                             Total Engs = Total Reactions +
                //                             Comments + Shares
                //                         </h5>
                //                       </div>
                //                     )}
                //                   />
                //                   <Table
                //                     tableData={[
                //                       [
                //                         <h6>Total Reactions</h6>,
                //                         <h6>
                //                           {platformDetails.fb
                //                             .totalReactions &&
                //                               platformDetails.fb.totalReactions.toLocaleString(
                //                                 'en'
                //                               )}
                //                         </h6>
                //                       ],
                //                       [
                //                         <h6>Comments</h6>,
                //                         <h6>
                //                           {platformDetails.fb
                //                             .totalComments &&
                //                               platformDetails.fb.totalComments.toLocaleString(
                //                                 'en'
                //                               )}
                //                         </h6>
                //                       ],
                //                       [
                //                         <h6>Share</h6>,
                //                         <h6>
                //                           {platformDetails.fb
                //                             .totalShares &&
                //                               platformDetails.fb.totalShares.toLocaleString(
                //                                 'en'
                //                               )}
                //                         </h6>
                //                       ]
                //                     ]}
                //                     coloredColls={[3]}
                //                     colorsColls={['primary']}
                //                   />
                //                 </div>
                //               )}
                //             />
                //           </ItemGrid>
                //         </GridContainer>
                //       )}
                //     /> */}
                //   </ItemGrid>
                // </GridContainer>
              )
            },
            {
              tabButton: 'DEMOGRAPHIC',
              tabContent: (
                <div/>
                // <GridContainer justify="center">
                //   <ItemGrid xs={12} sm={12} md={12}>
                //     {/* <RegularCard
                //       plainCard
                //       content={(
                //         <GridContainer>
                //           <Demographic
                //             locations={
                //               platformDetails.fb.demographicsLocation
                //             }
                //             ages={platformDetails.fb.demographicsAge}
                //             genders={
                //               platformDetails.fb.demographicsGender
                //             }
                //             areas={
                //               platformDetails.fb.demographicsArea
                //             }
                //             educations={
                //               platformDetails.fb.demographicsEducation
                //             }
                //             jobs={platformDetails.fb.demographicsJob}
                //           />
                //         </GridContainer>
                //       )}
                //     /> */}
                //   </ItemGrid>
                // </GridContainer>
              )
            },
            {
              tabButton: 'RECENT POSTS',
              tabContent: (
                <div/>
                // <GridContainer justify="center" style={{ padding: '10px' }}>
                //   <ItemGrid xs={12} sm={12} md={12}>
                //     <RecentPosts recentPosts={recentPosts} />
                //   </ItemGrid>
                // </GridContainer>
              )
            }
          ]}
        />
      )}
    />
  </div>
);
export default injectIntl (withStyles(styles)(NavPillsDetail));
