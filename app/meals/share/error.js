"use client";

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>
        Failed to create meal data.... Pleas try with correct input values!!!
      </p>
    </main>
  );
}
