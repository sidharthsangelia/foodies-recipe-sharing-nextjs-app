// app/meals/share/page.jsx
"use client";

import { useState } from "react";
import classes from "./page.module.css";
import ImagePicker from "@/components/meals/image-picker";

export default function ShareMealPage() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Upload image first
    const imageFile = formData.get("image");
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: new FormData().append("image", imageFile),
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.imageUrl) {
      setStatus("Image upload failed");
      return;
    }

    // Add image URL to form data
    const fullData = {
      name: formData.get("name"),
      email: formData.get("email"),
      title: formData.get("title"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: uploadData.imageUrl,
    };

    // Submit full form to your shareMeal action (make API route if needed)
    const saveRes = await fetch("/api/share-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });

    const result = await saveRes.json();
    setStatus(result.message || "Meal shared!");
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.row}>
            <div>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>

          <div>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </div>

          <div>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </div>

          <ImagePicker label="Your Image" name="image" />

          {status && <p>{status}</p>}

          <div className={classes.actions}>
            <button type="submit">Share Meal</button>
          </div>
        </form>
      </main>
    </>
  );
}
