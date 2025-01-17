"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setHotels } from "@/lib/features/hotel/hotelSlice";
import { loadHotels } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import HotelList from "@/components/HotelList";
import CategoryList from "@/components/CategoryList";
import HotelModal from "@/components/HotelModal";
import CategoryModal from "@/components/CategoryModal";
import { Hotel, Category } from "@/types";
import { useGetCountriesQuery } from "@/lib/services/api";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.hotels);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("hotels");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const {
    data: countries = [],
    isLoading: isLoadingCountries,
    error: countriesError,
  } = useGetCountriesQuery();

  useEffect(() => {
    const savedHotels = loadHotels();

    dispatch(setHotels(savedHotels));
    // dispatch(setCategories(savedCategories));
  }, [dispatch]);

  const handleAddHotel = () => {
    setSelectedHotel(undefined);
    setIsHotelModalOpen(true);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsHotelModalOpen(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };
  if (isLoadingCountries) {
    return <div>Loading App...</div>;
  }

  if (countriesError) {
    return <div>Error loading App. Please try again later.</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8"> Dashboard</h1>

      <div className="">
        {/* Search form */}

        {/* Tabs for Hotels and Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            <Button
              onClick={
                activeTab === "hotels" ? handleAddHotel : handleAddCategory
              }
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add {activeTab === "hotels" ? "Hotel" : "Category"}
            </Button>
          </div>
          <TabsContent value="hotels">
            <HotelList
              hotels={hotels}
              categories={categories}
              onEdit={handleEditHotel}
            />
          </TabsContent>
          <TabsContent value="categories">
            <CategoryList categories={categories} onEdit={handleEditCategory} />
          </TabsContent>
        </Tabs>
      </div>

      <HotelModal
        isOpen={isHotelModalOpen}
        onClose={() => setIsHotelModalOpen(false)}
        categories={categories}
        countries={countries}
        hotel={selectedHotel}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={selectedCategory}
      />
    </main>
  );
};

export default Dashboard;
