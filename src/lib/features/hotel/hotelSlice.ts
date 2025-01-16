import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "@/types";
import { saveHotels, loadHotels } from "@/lib/localStorage";

interface HotelState {
  hotels: Hotel[];
}

const initialState: HotelState = {
  hotels: loadHotels(),
};

export const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotels.push(action.payload);
      saveHotels(state.hotels);
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      if (index !== -1) {
        state.hotels[index] = action.payload;
        saveHotels(state.hotels);
      }
    },
    deleteHotel: (state, action: PayloadAction<string>) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
      saveHotels(state.hotels);
    },
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
      saveHotels(state.hotels);
    },
  },
});

export const { addHotel, updateHotel, deleteHotel, setHotels } =
  hotelSlice.actions;

export default hotelSlice.reducer;
