import { FiEdit, FiLock } from "react-icons/fi";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">

      {/* Heading */}

      <p className="text-sm text-red-600 font-semibold uppercase">
        System Control
      </p>

      <h1 className="text-5xl font-bold mb-8">
        Administrator Profile
      </h1>

      {/* Top Section */}

      <div className="grid grid-cols-3 gap-8">

        {/* Profile Card */}

        <div className="col-span-2 bg-white rounded-3xl shadow p-8">

          <div className="flex items-center gap-6">

            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt="Admin"
              className="w-36 h-36 rounded-2xl object-cover"
            />

            <div>

              <h2 className="text-3xl font-bold">
                Krish Kapoor
              </h2>

              <p className="text-red-600 font-semibold">
                Senior Administrator
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 mt-10">

            <div>
              <h4 className="text-gray-500 uppercase text-sm">
                Primary Email
              </h4>

              <p className="font-semibold">
                krish@gmail.com
              </p>
            </div>

            <div>
              <h4 className="text-gray-500 uppercase text-sm">
                Contact Number
              </h4>

              <p className="font-semibold">
                +91 9876543210
              </p>
            </div>

            <div>
              <h4 className="text-gray-500 uppercase text-sm">
                Access Level
              </h4>

              <p className="font-semibold">
                Full Administrative Control
              </p>
            </div>

            <div>
              <h4 className="text-gray-500 uppercase text-sm">
                Staff ID
              </h4>

              <p className="font-semibold">
                ADM-1025
              </p>
            </div>

          </div>

        </div>

        {/* Right Cards */}

        <div className="space-y-6">

          {/* Edit Credentials */}

          <div className="bg-orange-500 text-white rounded-3xl p-8">

            <FiEdit size={30} />

            <h2 className="text-2xl font-bold mt-5">
              Edit Credentials
            </h2>

            <p className="mt-3">
              Update your contact details and profile information.
            </p>

          </div>

          {/* Security */}

          <div className="bg-white rounded-3xl shadow p-8">

            <FiLock size={30} className="text-red-600" />

            <h2 className="text-2xl font-bold mt-5">
              Security
            </h2>

            <p className="text-gray-500 mt-3">
              Change password and manage account security.
            </p>

          </div>

          {/* System Online */}

          <div className="bg-white rounded-3xl shadow p-6">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <span className="font-semibold">
                SYSTEM ONLINE
              </span>

            </div>

            <p className="text-gray-500 mt-3 text-sm">
              Last Login:
              <br />
              Today 08:42 AM
            </p>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="flex justify-between mt-12 border-t pt-6">

        <div>

          <p className="text-gray-500 uppercase text-sm">
            Uptime
          </p>

          <h2 className="text-3xl font-bold">
            99.98%
          </h2>

        </div>

        <div>

          <p className="text-gray-500 uppercase text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold">
            12.4K
          </h2>

        </div>

        <div className="text-gray-500 self-end">
          Internal Admin Dashboard v1.0
        </div>

      </div>

    </div>
  );
};

export default Profile;