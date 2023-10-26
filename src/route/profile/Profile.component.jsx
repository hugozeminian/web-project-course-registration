import ProfileInformation from "../../components/profile-information/ProfileInformation.component";
import TitlePage from "../../components/title-page/TitlePage.component";

const Profile = () => {
  return (
    <>
      <TitlePage title="Profile Information" />
      <ProfileInformation isAdminProfile={false} />
    </>
  );
};

export default Profile;
