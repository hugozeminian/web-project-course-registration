import TitlePage from "../../components/title-page/TitlePage.component";
import ProfileInformation from "../../components/profile-information/ProfileInformation.component";

const AdmProfile = () => {
  return (
    <>
      <ProfileInformation isAdminProfile={true} />
    </>
  );
};

export default AdmProfile;
