import ProfileInformation from "../../components/profile-information/ProfileInformation.component";
import TitlePage from "../../components/title-page/TitlePage.component";

const AdmProfile = () => {
  return (
    <>
      <TitlePage title="Admin Profile Information" />
      <ProfileInformation isAdminProfile={true} />
    </>
  );
};

export default AdmProfile;
