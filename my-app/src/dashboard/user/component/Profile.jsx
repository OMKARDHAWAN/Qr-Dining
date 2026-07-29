import ProfileHeader from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import profileData from "../data/profileData";

function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-5">
        <ProfileHeader profile={profileData} />
        <ProfileForm profile={profileData} />
      </div>
    </div>
  );
}

export default Profile;