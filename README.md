# Hotels Ranking Dashboard

## Description

Hotels Ranking Dashboard is a web application that allows users to manage and rank hotels across different categories. It provides an intuitive interface for adding, editing, and categorizing hotels, as well as managing hotel categories.

## Features

- Dashboard view with quick access to hotels and categories
- CRUD operations for hotels and categories
- Responsive design with mobile-friendly sidebar
- Real-time data updates using RTK Query
- Form validation using React Hook Form

## Technologies Used

- Next.js
- React
- TypeScript
- Redux Toolkit with RTK Query
- Tailwind CSS

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup Instructions

1. Clone the repository:

2. Install dependencies:

```
npm install --legacy-peer-deps

```

4. Run the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
hotels-ranking-dashboard/
├── app/
│   └── page.tsx
├── components/
│   ├── CategoryList.tsx
│   ├── CategoryModal.tsx
│   ├── HotelList.tsx
│   └── HotelModal.tsx
├── lib/
│   ├── features/
│   │   ├── categories/
│   │   │   └── categoriesSlice.ts
│   │   └── hotels/
│   │       └── hotelsSlice.ts
│   ├── services/
│   │   └── api.ts
│   ├── utils/
│   │   └── localStorage.ts
│   ├── store.ts
│   └── types.ts
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```
