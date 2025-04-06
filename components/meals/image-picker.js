'use client';

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const [base64Data, setBase64Data] = useState('');
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      setBase64Data('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result);
      setBase64Data(reader.result); // base64 encoded image
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>

        {/* Actual file input (hidden) */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          name="file" // use a temp name; base64 goes in 'image'
          ref={imageInput}
          onChange={handleImageChange}
          required
        />

        {/* Hidden input with base64 string */}
        <input
          type="hidden"
          name="image"
          value={base64Data}
        />

        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
