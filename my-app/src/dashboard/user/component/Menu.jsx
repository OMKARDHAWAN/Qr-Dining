import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import FoodCard from "../components/FoodCard";
import menuData from "../data/menuData";

function Menu() {
  const pizza = menuData.filter(
    (item) => item.category === "Pizza"
  );

  const indian = menuData.filter(
    (item) => item.category === "Indian"
  );

  const burger = menuData.filter(
    (item) => item.category === "Burger"
  );

  const chinese = menuData.filter(
    (item) => item.category === "Chinese"
  );

  return (
    <div className="bg-[#fff8f6] min-h-screen">

      <Header />

      <CategoryBar />

      <main className="pt-44 max-w-[1650px] mx-auto px-8">

        {/* Pizza */}

        <section className="mb-16">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              🍕 Pizza
            </h1>

            <p className="text-2xl">
              {pizza.length} items
            </p>

          </div>

          <div className="grid xl:grid-cols-2 gap-10">

            {pizza.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}

          </div>

        </section>

        {/* Indian */}

        <section className="mb-16">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              🍛 Indian
            </h1>

            <p className="text-2xl">
              {indian.length} items
            </p>

          </div>

          <div className="grid xl:grid-cols-2 gap-10">

            {indian.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}

          </div>

        </section>

        {/* Burger */}

        <section className="mb-16">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              🍔 Burgers
            </h1>

          </div>

          <div className="grid xl:grid-cols-2 gap-10">

            {burger.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}

          </div>

        </section>

        {/* Chinese */}

        <section className="mb-16">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              🥡 Chinese
            </h1>

          </div>

          <div className="grid xl:grid-cols-2 gap-10">

            {chinese.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Menu;