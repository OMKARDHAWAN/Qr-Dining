import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Award,
    Edit,
} from "lucide-react";

export default function Profile() {
    const chef = {
        name: "Vikram Singh",
        role: "Executive Chef",
        email: "vikram@qrdining.com",
        phone: "+91 9876543210",
        experience: "10 Years",
        specialization: "North Indian Cuisine",
        address: "Bhopal, Madhya Pradesh",
        orders: 1268,
        rating: 4.9,
        dishes: 52,
        shift: "Morning",
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your profile information.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">

                    <Edit size={18} />

                    Edit Profile

                </button>

            </div>

            {/* Top Card */}

            <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center gap-8">

                <img
                    src="https://i.pravatar.cc/250?img=12"
                    alt="Chef"
                    className="w-36 h-36 rounded-full border-4 border-orange-500"
                />

                <div>

                    <h2 className="text-4xl font-bold">
                        {chef.name}
                    </h2>

                    <p className="text-orange-500 font-semibold text-lg mt-2">
                        {chef.role}
                    </p>

                    <div className="flex gap-8 mt-6 text-gray-600">

                        <div className="flex items-center gap-2">
                            <Mail size={18} />
                            {chef.email}
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone size={18} />
                            {chef.phone}
                        </div>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-4 gap-6 mt-8">

                <div className="bg-white rounded-2xl p-6 shadow">

                    <h3 className="text-gray-500">
                        Orders Completed
                    </h3>

                    <h1 className="text-4xl font-bold mt-3 text-orange-500">
                        {chef.orders}
                    </h1>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow">

                    <h3 className="text-gray-500">
                        Rating
                    </h3>

                    <h1 className="text-4xl font-bold mt-3 text-green-600">
                        ⭐ {chef.rating}
                    </h1>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow">

                    <h3 className="text-gray-500">
                        Signature Dishes
                    </h3>

                    <h1 className="text-4xl font-bold mt-3 text-blue-600">
                        {chef.dishes}
                    </h1>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow">

                    <h3 className="text-gray-500">
                        Shift
                    </h3>

                    <h1 className="text-4xl font-bold mt-3 text-purple-600">
                        {chef.shift}
                    </h1>

                </div>

            </div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-8 mt-8">

                {/* Personal Info */}

                <div className="bg-white rounded-3xl shadow p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Personal Information
                    </h2>

                    <div className="space-y-6">

                        <div className="flex items-center gap-4">

                            <Mail className="text-orange-500" />

                            <div>

                                <p className="text-gray-500">
                                    Email
                                </p>

                                <h3 className="font-semibold">
                                    {chef.email}
                                </h3>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Phone className="text-orange-500" />

                            <div>

                                <p className="text-gray-500">
                                    Phone
                                </p>

                                <h3 className="font-semibold">
                                    {chef.phone}
                                </h3>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <MapPin className="text-orange-500" />

                            <div>

                                <p className="text-gray-500">
                                    Address
                                </p>

                                <h3 className="font-semibold">
                                    {chef.address}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Professional Info */}

                <div className="bg-white rounded-3xl shadow p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Professional Details
                    </h2>

                    <div className="space-y-6">

                        <div className="flex items-center gap-4">

                            <Briefcase className="text-orange-500" />

                            <div>

                                <p className="text-gray-500">
                                    Experience
                                </p>

                                <h3 className="font-semibold">
                                    {chef.experience}
                                </h3>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Award className="text-orange-500" />

                            <div>

                                <p className="text-gray-500">
                                    Specialization
                                </p>

                                <h3 className="font-semibold">
                                    {chef.specialization}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}