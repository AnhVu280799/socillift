import React from 'react';
import Button from 'components/CustomButtons/Button.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';
import { injectIntl } from 'react-intl';

export const Content = ({ verticals, avg_engagement, total_follower, avg_influence,intl }) => (
  <GridContainer>
    <ItemGrid xs={12} sm={12} md={12} lg={12}>
      {verticals
        ? verticals.map(v => (
          <Button
            color="github"
            size="xs"
            key={v}
            style={{ pointerEvents: 'none' }}
            round
          >
            {intl.formatMessage({ defaultMessage: "v"})}
          </Button>
        ))
        : null}
    </ItemGrid>
    <table style={{ width: '100%', textAlign: 'left' }}>
      <tbody>
        <tr>
          <td>
            <p style={{ margin: '0.35em' }}>{intl.formatMessage({ defaultMessage: "Followers"})}</p>
          </td>
          <td style={{ float: 'right' }}>
            <p style={{ margin: '0.35em' }}>
              {total_follower && total_follower.toLocaleString('en')}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p style={{ margin: '0.35em' }}>{intl.formatMessage({ defaultMessage: "Avg. Engagement"})}</p>
          </td>
          <td style={{ float: 'right' }}>
            <p style={{ margin: '0.35em' }}>
              {avg_engagement && avg_engagement.toLocaleString('en')}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p style={{ margin: '0.35em' }}>{intl.formatMessage({ defaultMessage: "Avg. Influence"})}</p>
          </td>
          <td style={{ float: 'right' }}>
            <p style={{ margin: '0.35em' }}>
              {avg_influence && avg_influence.toLocaleString('en')}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </GridContainer>
);
Content.propTypes = {};
export default injectIntl (Content);
