"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card } from "flowbite-react";

const listArray = [
  "Laura Brown",
  "Ethan Christ",
  "Spencer Cook",
  "Chance Creger",
  "Erik Edin",
  "Bryn Glotfelty",
  "Daniel Goss",
  "Halden Kavanagh",
  "Gabriel Latimer",
  "Aaron Lyman",
  "Patrick Mulville",
  "Zachary Short",
  "Maguire Wilson",
];

export default function Home() {
  const pipEls = [];
  for (let i = 0; i < listArray.length; i++) {
    pipEls.push(useRef());
  }

  const [winner, setWinner] = useState("");

  const rollHandler = async () => {
    const min = 3;
    const max = 7;
    const randomRoll = Math.floor(Math.random() * (max - min) + min);
    console.log(`rolling ${randomRoll} times.`);
    for (let i = 0; i < randomRoll; i++) {
      await roll();
      if (i === randomRoll - 1) {
        win();
      }
    }
  };

  async function roll() {
    const rollTime = 80 * (pipEls.length + 1);
    pipEls.forEach((pip, i) => {
      setTimeout(function () {
        pip.current.classList.add("rolling");
        setTimeout(function () {
          pip.current.classList.remove("rolling");
        }, 80);
      }, 80 * i + 1);
    });
    return new Promise((resolve) => setTimeout(resolve, rollTime));
  }

  async function win() {
    console.log("winning");
    const winIndex = Math.floor(Math.random() * pipEls.length);
    console.log(pipEls[winIndex].current.innerHTML);
    setWinner(pipEls[winIndex].current.innerHTML);
    alert(`🎉🎉🎉 ${winner} wins! 🎉🎉🎉`);
  }

  return (
    <div className="container my-6">
      <Card className="max-w-md w-2/3 mx-auto">
        <h5 className="text-2xl text-center pb-2 border-b font-bold  text-gray-900 dark:text-white">
          🎲 Time to roll 🎲
        </h5>
        <ol className="list-decimal font-normal border-b ps-12 pb-3 text-gray-700 dark:text-gray-400">
          {listArray.map((item, index) => (
            <li
              ref={pipEls[index]}
              className="itsAPip rounded w-full"
              key={`listItem${index + 1}`}
            >
              {item}
            </li>
          ))}
        </ol>
        <Button color="light" onClick={rollHandler}>
          🎲🎲🎲 Roll 🎲🎲🎲
        </Button>
      </Card>
    </div>
  );
}
