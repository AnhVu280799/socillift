import React from 'react';
import ProfileCard from 'components/Cards/ProfileCard.jsx';
import Content from 'components/Content';

export const InfluencerProfile = ({
  avatar,
  title,
  onClick,
  goToUrl,
  showOverlay,
  onSelect,
  checked,
  ...rest
}) => (
  <ProfileCard
    avatar={avatar}
    title={title}
    goToUrl={goToUrl}
    showOverlay={showOverlay}
    onSelect={onSelect}
    checked={checked}
    content={<Content {...rest} />}
  />
);
InfluencerProfile.propTypes = {};
export default InfluencerProfile;
