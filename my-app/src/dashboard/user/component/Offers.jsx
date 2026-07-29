import OfferCard from "../components/OfferCard";
import PlatinumClub from "../components/PlatinumClub";
import offersData from "../data/offersData";

function Offers() {
  return (
    <div className="min-h-screen bg-[#fff8f6]">

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-[#b51c01]">
            Exclusive Promotions
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Indulge in premium culinary experiences with our curated offers.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {offersData.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
            />
          ))}

        </div>

        {/* Platinum Club */}

        <PlatinumClub />

      </main>

    </div>
  );
}

export default Offers;