"use client"
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useActionState } from "react";

export default function ShareMealPage() {

  const [state, formAction]= useActionState(shareMeal, {message:null});

const status = useFormStatus();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
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

          {state.message && <p>{state.message}</p>}

          <div className={classes.actions}>
            <MealsFormSubmit></MealsFormSubmit>
          </div>
        </form>
      </main>
    </>
  );
}
