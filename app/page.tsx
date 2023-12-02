'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [pipArray, setPipArray] = useState([]);

  useEffect(() => {
    setPipArray(document.querySelectorAll(".itsAPip"));
  }, []);

  const rollHandler = () => {
    // const pipArray = document.querySelectorAll(".itsAPip");
    pipArray.forEach((pip) => {
      // pip.classList.remove("active");
      console.log(pip.classList);
      
    });
  
  
    const random = Math.floor(Math.random() * listArray.length);
    alert(listArray[random]);
  }

  return (
    <div className="container my-6">
      <Card className="max-w-md w-2/3 mx-auto">
        <h5 className="text-2xl text-center pb-2 border-b font-bold  text-gray-900 dark:text-white">
        🎲 Time to roll 🎲
        </h5>
        <ol className="list-decimal font-normal border-b ps-12 pb-3 text-gray-700 dark:text-gray-400">
          {listArray.map((item, index) => (
            <li className="itsAPip w-full" key={`listItem${index + 1}`}>{item}</li>
          ))}
        </ol>
        <Button color="light" onClick={rollHandler}>
          🎲🎲🎲 Roll 🎲🎲🎲
        </Button>
      </Card>
    </div>
  );
}
