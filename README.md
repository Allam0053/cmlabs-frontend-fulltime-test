# Recipes Website

how to install:

[https://youtu.be/94L4ctwi5ek](https://youtu.be/94L4ctwi5ek)

technical explanation:

[https://youtu.be/ejaVJFgBlOE](https://youtu.be/ejaVJFgBlOE)

## Getting Started

### 1. Install dependencies

tested in Node.js v18.12.1

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

or

```bash
npm install
```

### 2. Run the development server

You can start the server using this command:

```bash
yarn dev
```

or

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

## Project

### API Endpoint

| Name                 | URL                                                                                   | Type     |
| -------------------- | ------------------------------------------------------------------------------------- | -------- |
| List of Ingredients  | <http://www.themealdb.com/api/json/v1/1/list.php?i=list>                              | Required |
| Filter by Ingredient | <http://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast{ingredient-name>} | Required |
| Detail Meal          | <http://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id>}                       | Optional |

### Tasks

1. Silakan buat halaman dan tampilkan data berdasarkan API diatas
   - **Halaman Ingredients** _Requirements:_
2. (v) Berisikan list data ingredients berdasarkan endpoint **_List of Ingredients_**
3. (v) Ketika list ingredient dipilih, halaman akan redirect menuju halaman **_Ingredients Detail_**
4. (v) ('05/03/2023') Wajib ada fitur **_Search Ingredients by Name_** di sisi front-end
5. (v) Komponen: List Ingredients, Search Ingredients
   - **Halaman Ingredients Detail** _Requirements:_
6. (v) Parameter → ingredient-name
7. (v) Berisikan list data meal berdasarkan data ingredient yang dipilih, endpoint dari **_Filter by Ingredients_**
8. (v) Jika data meal dipilih, halaman akan redirect menuju halaman **_Meals Detail_**
9. (v) Wajib ada fitur **_Search Meal by Name_** di sisi front-end
10. (v) Komponen: List meal dengan gambar, Search Meal
    - **Meals Detail** (_Optional, jika dikerjakan akan menjadi nilai lebih_)
11. (v) Parameter → meal-id
12. (v) Tamplikan detail meal berdasarkan list yang dipilih
13. (v) Endpoint menggunakan **_Detail Meal_**
14. (v) Komponen: Gambar Meal, Judul/Nama Meal, Desksripsi/Tutorial, Recipe, Youtube Embedded
15. (v) Requirements
    1. Wajib menggunakan framework **VueJS / ReactJS**
    2. NuxtJS / NextJS menjadi nilai lebih
    3. CSS, boleh pakai bootstrap / tailwind
16. (v) Silakan gunakan kreativitas anda untuk membuat dan menyusun halaman diatas (kualitas tampilan akan menjadi nilai lebih)
17. (v) Penggunaan atomic component lebih diutamakan
18. (v) Halaman Wajib Responsive
19. (v) (Opsional) Deploy hasil pengerjaan boleh ke Netlify, Vercel, Github pages
