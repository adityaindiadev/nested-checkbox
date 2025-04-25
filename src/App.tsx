import React, { useState } from "react";
import CheckBox from "./components/CheckBox";
import "./styles.css";
const options1 = [
  {
    id: "fruit",

    label: "Fruit",

    values: [
      { id: "apple", label: "Apple", values: [] },

      { id: "banana", label: "Banana", values: [] },

      { id: "cherry", label: "Cherry", values: [] },
    ],
  },

  {
    id: "animal",

    label: "Animal",

    values: [
      { id: "dog", label: "Dog", values: [] },

      { id: "elephant", label: "Elephant", values: [] },

      { id: "cat", label: "Cat", values: [] },
    ],
  },
];
const options2 = [
  {
    id: "fruit",
    label: "Fruit",
    values: [
      {
        id: "apple",
        label: "Apple",
        values: [
          { id: "fuji", label: "Fuji", values: [] },
          { id: "gala", label: "Gala", values: [] },
          { id: "honeycrisp", label: "Honeycrisp", values: [] },
        ],
      },
      {
        id: "banana",
        label: "Banana",
        values: [
          { id: "cavendish", label: "Cavendish", values: [] },
          { id: "plantain", label: "Plantain", values: [] },
          { id: "red_dacca", label: "Red Dacca", values: [] },
        ],
      },
      {
        id: "berry",
        label: "Berry",
        values: [
          {
            id: "strawberry",
            label: "Strawberry",
            values: [
              { id: "everbearing", label: "Everbearing", values: [] },
              { id: "june_bearing", label: "June-bearing", values: [] },
            ],
          },
          { id: "blueberry", label: "Blueberry", values: [] },
          { id: "raspberry", label: "Raspberry", values: [] },
        ],
      },
    ],
  },
  {
    id: "animal",
    label: "Animal",
    values: [
      {
        id: "mammal",
        label: "Mammal",
        values: [
          {
            id: "canine",
            label: "Canine",
            values: [
              { id: "dog", label: "Dog", values: [] },
              { id: "wolf", label: "Wolf", values: [] },
              { id: "fox", label: "Fox", values: [] },
            ],
          },
          {
            id: "feline",
            label: "Feline",
            values: [
              { id: "cat", label: "Cat", values: [] },
              { id: "lion", label: "Lion", values: [] },
              { id: "tiger", label: "Tiger", values: [] },
            ],
          },
          { id: "elephant", label: "Elephant", values: [] },
        ],
      },
      {
        id: "bird",
        label: "Bird",
        values: [
          { id: "eagle", label: "Eagle", values: [] },
          { id: "sparrow", label: "Sparrow", values: [] },
          { id: "penguin", label: "Penguin", values: [] },
        ],
      },
      {
        id: "reptile",
        label: "Reptile",
        values: [
          { id: "snake", label: "Snake", values: [] },
          { id: "lizard", label: "Lizard", values: [] },
          { id: "turtle", label: "Turtle", values: [] },
        ],
      },
    ],
  },
  {
    id: "color",
    label: "Color",
    values: [
      {
        id: "primary",
        label: "Primary",
        values: [
          { id: "red", label: "Red", values: [] },
          { id: "blue", label: "Blue", values: [] },
          { id: "yellow", label: "Yellow", values: [] },
        ],
      },
      {
        id: "secondary",
        label: "Secondary",
        values: [
          { id: "green", label: "Green", values: [] },
          { id: "orange", label: "Orange", values: [] },
          { id: "purple", label: "Purple", values: [] },
        ],
      },
      {
        id: "neutral",
        label: "Neutral",
        values: [
          { id: "white", label: "White", values: [] },
          { id: "black", label: "Black", values: [] },
          { id: "gray", label: "Gray", values: [] },
        ],
      },
    ],
  },
];
export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return <CheckBox data={options2} />;
}
