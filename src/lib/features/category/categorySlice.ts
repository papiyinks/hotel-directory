import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";
import { saveCategories, loadCategories } from "@/lib/localStorage";

const defaultCategories: Category[] = [
  { id: "1", name: "One Star" },
  { id: "2", name: "Two Stars" },
  { id: "3", name: "Three Stars" },
  { id: "4", name: "Four Stars" },
  { id: "5", name: "Five Stars" },
];

const initialState: { categories: Category[] } = {
  categories:
    loadCategories().length > 0 ? loadCategories() : defaultCategories,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      saveCategories(state.categories);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
        saveCategories(state.categories);
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      saveCategories(state.categories);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      saveCategories(state.categories);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, setCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
