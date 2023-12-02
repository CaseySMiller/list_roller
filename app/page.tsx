"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card } from "flowbite-react";

const listArray = [
  "Brown, Laura",
  "Christ, Ethan",
  "Cook, Spencer",
  "Creger, Chance",
  "Edin, Erik",
  "Glotfelty, Bryn",
  "Goss, Daniel",
  "Kavanagh, Halden",
  "Latimer, Gabriel",
  "Lyman, Aaron",
  "Mulville, Patrick",
  "Short, Zachary",
  "Wilson, Maguire",
];

export default function Home() {
  const pipEls = useRef(new Array());
  // set winner state
  const [winner, setWinner] = useState("")

  const rollHandler = async () => {
    const min = 4;
    const max = 7;
    const randomRoll = Math.floor(Math.random() * (max - min) + min);
    for (let i = 0; i < randomRoll; i++) {
      await roll();
      console.log(`rolling ${randomRoll} times.`);
      if (i === randomRoll - 1) {
        win();
      }
    }
  };

  async function roll() {
    const rollTime = 80 * (pipEls.current.length + 1);
    pipEls.current.forEach((pip, i) => {
      setTimeout(function () {
        pip.classList.add("rolling");
        setTimeout(function () {
          pip.classList.remove("rolling");
        }, 80);
      }, 80 * i + 1);
    });
    return new Promise((resolve) => setTimeout(resolve, rollTime))
  };

  async function win() {
    console.log("winning");
    const winIndex = Math.floor(Math.random() * pipEls.current.length);
    console.log(pipEls.current[winIndex].innerHTML);
    setWinner(pipEls.current[winIndex].innerHTML)
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
              ref={pipEls.current.length <= listArray.length ? (e) => pipEls.current.push(e) : null}
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
