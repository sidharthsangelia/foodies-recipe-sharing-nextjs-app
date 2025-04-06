import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { v2 as cloudinary } from "cloudinary";

// DB Setup
const db = sql("meals.db");

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Convert image to base64 string format (if not already)
  const matches = meal.image.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image format");
  }

  const base64Data = `data:image/${matches[1]};base64,${matches[2]}`;

  // Upload to Cloudinary
  const uploadResponse = await cloudinary.uploader.upload(base64Data, {
    folder: "meals", // Cloudinary folder name
    public_id: meal.slug, // image name = slug
    overwrite: true,
  });

  meal.image = uploadResponse.secure_url; // Store Cloudinary image URL in DB

  // Save to DB
  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}
