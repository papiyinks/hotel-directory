import { Hotel, Category } from "../types";

export const saveHotels = (hotels: Hotel[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }
};

export const loadHotels = (): Hotel[] => {
  if (typeof window !== "undefined") {
    const hotels = localStorage.getItem("hotels");
    return hotels ? JSON.parse(hotels) : [];
  }
  return [];
};

export const saveCategories = (categories: Category[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("categories", JSON.stringify(categories));
  }
};

export const loadCategories = (): Category[] => {
  if (typeof window !== "undefined") {
    const categories = localStorage.getItem("categories");
    return categories ? JSON.parse(categories) : [];
  }
  return [];
};
