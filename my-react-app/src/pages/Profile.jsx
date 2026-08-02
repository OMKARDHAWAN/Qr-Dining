import ProfileHeader from "../components/ProfileHeader";
import ProfileEditForm from "../components/ProfileEditForm";
import profileData from "../data/profileData";

function Profile() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">

      <ProfileHeader profile={profileData} />

      <ProfileEditForm profile={profileData} />

    </main>
  );
}

export default Profile;