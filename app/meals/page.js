import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const meal = getMeals(params.mealSlug);
  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export default function page() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cool it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favourite recepie</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <Meals></Meals>
        </Suspense>
      </main>
    </>
  );
}
