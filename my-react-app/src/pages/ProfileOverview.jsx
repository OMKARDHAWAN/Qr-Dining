import ProfileOverviewHeader from "../components/ProfileOverviewHeader";
import PersonalInfoCard from "../components/PersonalInfoCard";
import AccountActionCards from "../components/AccountActionCards";
import LogoutCard from "../components/LogoutCard";

import profileOverviewData from "../data/profileOverviewData";

function ProfileOverview() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

      <ProfileOverviewHeader profile={profileOverviewData} />

      <PersonalInfoCard profile={profileOverviewData} />

      <AccountActionCards profile={profileOverviewData} />

      <LogoutCard profile={profileOverviewData} />

    </main>
  );
}

export default ProfileOverview;