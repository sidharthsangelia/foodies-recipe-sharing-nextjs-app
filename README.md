# 🍲 Foodies - Recipe Sharing App

This is a full-stack recipe sharing app built using **Next.js (App Router)**. It allows users to add, view, and explore meal recipes with images and instructions. This project helped me understand real-world development with Next.js, dynamic routing, form handling, and file uploads.

---

## 🚀 Features

- View a list of all recipes (meals)
- Detailed recipe page with image, title, summary, and step-by-step instructions
- Add new meals through a form (with file upload)
- Server-side rendering and static generation with dynamic routes
- Styling with CSS Modules
- Image optimization using `next/image`
- Backend handled using API routes

---

## 🧠 What I Learned

### 📌 Next.js Concepts
- **App Router**: Routing using the new `app/` directory instead of the older `pages/` directory.
- **Dynamic Routing**: Used dynamic route segments like `[mealSlug]` to fetch and render individual meal pages.
- **API Routes**: Created custom API endpoints for handling form submissions and file uploads.
- **Image Optimization**: Used the `next/image` component for better performance and responsive images.
- **Static Site Generation (SSG)**: Learned how to pre-render pages using `getStaticProps` and `generateStaticParams`.

### 📝 Form Handling
- Learned how to handle multipart form submissions using FormData.
- Managed validation and form submission state.

### 📁 File Uploads
- Faced challenges with uploading files via API routes in Next.js App Router.
- Understood how to parse `multipart/form-data` using third-party libraries (like `formidable` or `multer`) and how Vercel handles them in serverless environments.

### 💅 Styling
- Used **CSS Modules** for scoped styling per component.
- Built responsive layouts for better UI on desktop and mobile.

## 🧨 Deployment Issues

While the app worked perfectly during local development—with all features like viewing, adding, and uploading meals functioning smoothly—it unfortunately broke after deployment to **Vercel**.

Some **core features stopped working** in production, especially:
- API routes handling file uploads (`/api/upload`) return `500 Internal Server Error`
- JSON parsing errors due to unexpected or missing responses
- Multipart form data not being handled correctly in the deployed environment

Despite the best effort to debug and resolve these deployment issues, they remain unresolved for now due to the limitations of serverless functions in handling multipart form data and the absence of a persistent storage solution.

> 🛠️ Fixing these would likely require switching to an external file/image storage service like **Cloudinary** or **AWS S3**, and adjusting the API architecture accordingly.

---



### ⚠️ Error Handling & Debugging
- Faced and fixed:
  - `500 Internal Server Error` during file uploads.
  - JSON parsing issues when API didn’t return expected output.
  - Sentry errors and console logs caused by browser extensions.
- Learned to use `try/catch` blocks in both client and server to gracefully handle errors and display helpful messages.

---

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: CSS Modules
- **Image Upload**: `next/image` + custom API (with future plan to use Cloudinary or similar)
- **Deployment**: Vercel

---

Click the link to see deployed version on vercel
https://foodies-recipe-sharing-nextjs-app.vercel.app/
