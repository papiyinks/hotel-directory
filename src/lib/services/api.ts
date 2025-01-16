import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pkgstore.datahub.io/core/world-cities/",
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () =>
        "world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any[]) => {
        const uniqueCountries = Array.from(
          new Set(response.map((item) => item.country))
        ).map((country) => ({ country: country as string }));
        return uniqueCountries as Country[];
      },
    }),
  }),
});

export const { useGetCountriesQuery } = api;
