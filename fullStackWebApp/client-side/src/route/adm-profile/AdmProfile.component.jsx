import React from "react";
import ProfileInformation from "../../components/profile-information/ProfileInformation.component";
import { getAuthenticatedUser } from "../../util/api/api";

const AdmProfile = () => {
  const authenticatedUser = getAuthenticatedUser() || {};
  return (
    <>
      <ProfileInformation authenticatedUser={authenticatedUser} />
    </>
  );
};

export default AdmProfile;
