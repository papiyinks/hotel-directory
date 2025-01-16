import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHotel } from "@/lib/features/hotel/hotelSlice";
import { Hotel, Category } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, HotelIcon } from "lucide-react";

interface HotelListProps {
  hotels: Hotel[];
  categories: Category[];
  onEdit: (hotel: Hotel) => void;
}

const HotelList = ({ hotels, categories, onEdit }: HotelListProps) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "category">("name");

  const filteredHotels =
    selectedCategory === "all"
      ? hotels
      : hotels.filter((hotel) => hotel.category === selectedCategory);

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.category.localeCompare(b.category);
    }
  });

  const handleDelete = (id: string) => {
    dispatch(deleteHotel(id));
  };
  if (hotels.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <HotelIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hotels</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new hotel.
        </p>
        <div className="mt-6"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setSortBy(value as "name" | "category")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="category">Sort by Category</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedHotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardHeader>
              <CardTitle>{hotel.name}</CardTitle>
              <CardDescription>{hotel.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Country:</strong> {hotel.country}
              </p>
              <p>
                <strong>Address:</strong> {hotel.address}
              </p>
            </CardContent>
            <div className="flex justify-end p-4">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEdit(hotel)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(hotel.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
