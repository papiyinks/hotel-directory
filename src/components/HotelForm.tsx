import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "@/lib/features/hotel/hotelSlice";
import { RootState } from "@/lib/store";
import { Hotel, Country } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HotelForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const uniqueCountries = Array.from(
          new Set(data.map((item: Country) => item.country))
        ).map((country) => ({ country: country as string }));
        setCountries(uniqueCountries as Country[]);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && country && address && category) {
      const newHotel: Hotel = {
        id: Date.now().toString(),
        name,
        country,
        address,
        category,
      };
      dispatch(addHotel(newHotel));
      setName("");
      setCountry("");
      setAddress("");
      setCategory("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Hotel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hotel Name"
            required
          />
          <Select onValueChange={setCountry} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country, index) => (
                <SelectItem key={index} value={country.country}>
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <Select onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Add Hotel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HotelForm;
