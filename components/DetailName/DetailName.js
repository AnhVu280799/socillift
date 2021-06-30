import React from 'react';
import PropTypes from 'prop-types';

// core components
import IconName from 'components/IconName';

export const DetailName = ({ name, platformDetail, editButton }) => (
  <h4>
    {name}
    {' '}
    {Object.keys(platformDetail)
      .filter((platform) => !!platformDetail[platform].id)
      .map((platform, idx) => (
        <IconName platform={platform} key={idx} />
      ))}
    {editButton}
  </h4>
);

DetailName.propTypes = {
  name: PropTypes.string.isRequired,
  platformDetail: PropTypes.object.isRequired,
  editButton: PropTypes.object.isRequired
};
export default DetailName;
