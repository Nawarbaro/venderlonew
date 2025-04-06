import React from "react";
import { useState } from "react";

const sampleCars = [
  { id: 1, make: "Tesla", model: "Model 3", year: 2022, price: 180000, image: "https://via.placeholder.com/400x200?text=Tesla+Model+3" },
  { id: 2, make: "Toyota", model: "Camry", year: 2020, price: 75000, image: "https://via.placeholder.com/400x200?text=Toyota+Camry" },
  { id: 3, make: "BMW", model: "X5", year: 2021, price: 135000, image: "https://via.placeholder.com/400x200?text=BMW+X5" },
];

export default function Venderlo() {
  const [cars, setCars] = useState(sampleCars);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ make: "", model: "", year: "", price: "", image: "" });

  const handleSearch = (e) => setSearch(e.target.value);
  const filteredCars = cars.filter((car) =>
    \`\${car.make} \${car.model}\`.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCar = () => {
    const newCar = {
      id: Date.now(),
      make: form.make,
      model: form.model,
      year: parseInt(form.year),
      price: parseFloat(form.price),
      image: form.image || "https://via.placeholder.com/400x200?text=New+Car",
    };
    setCars([newCar, ...cars]);
    setForm({ make: "", model: "", year: "", price: "", image: "" });
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Venderlo - Buy & Sell Cars</h1>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          placeholder="Search cars..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/2"
        />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-semibold">List Your Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="make" placeholder="Make" value={form.make} onChange={handleFormChange} />
          <input name="model" placeholder="Model" value={form.model} onChange={handleFormChange} />
          <input name="year" placeholder="Year" value={form.year} onChange={handleFormChange} />
          <input name="price" placeholder="Price (AED)" value={form.price} onChange={handleFormChange} />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleFormChange} />
        </div>
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="card">
            <img
              src={car.image}
              alt={\`\${car.make} \${car.model}\`}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-green-600 font-semibold">AED {car.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
