"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card, Modal } from "flowbite-react";
import { json } from "stream/consumers";

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
  const rollBtnEl: any = useRef(null);
  const pipEls: any = [];
  for (let i = 0; i < listArray.length; i++) {
    pipEls.push(useRef());
  }

  const [winner, setWinner] = useState("Casey");
  const [openModal, setOpenModal] = useState(false);
  const [wonArray, setWonArray] = useState<number[]>([]);
  
  useEffect(() => {
    const checkLocalStorage = async () => {
      console.log("checking local storage");
      const dbWinCheck = await localStorage.getItem("wonArray");
      const localWonArray = dbWinCheck ? JSON.parse(dbWinCheck) : null;
      // if local storage found, set wonArray to localWonArray
      if (localWonArray && localWonArray.length && localWonArray.length > wonArray.length) {
        console.log("local storage found");
        setWonArray(localWonArray);
        // map localWonArray to pipEls and add winner class
        localWonArray.forEach((item: number) => {
          pipEls[item].current.classList.add("winner");
        });
      } else { // if no local storage found, set local storage to wonArray
        console.log("no local storage found");
        localStorage.setItem("wonArray", JSON.stringify(wonArray));
      }
    }
    checkLocalStorage();
  }, [wonArray]);
  
  const winConfirmHandler = () => {
    rollBtnEl.current ? rollBtnEl.current.removeAttribute("disabled") : null;
    setOpenModal(false);
  }

  const rollHandler = async () => {
    rollBtnEl.current ? rollBtnEl.current.setAttribute("disabled", "") : null;
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
    pipEls.forEach((pip: any, i: any) => {
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
    if (!pipEls[winIndex].current.classList.contains("winner")) {
      console.log(pipEls[winIndex].current.innerHTML);
      setWinner(pipEls[winIndex].current.innerHTML);
      setOpenModal(true);
      // updateWins(winIndex);
      pipEls[winIndex].current.classList.add("winner");
      setWonArray([...wonArray, winIndex]);      
    } else {
      console.log("already won, rolling again");
      return win();
    }
  }

  // async function updateWins(i: number) {
  // }

  return (
    <>
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
          <Button 
          color="light" 
          onClick={rollHandler} 
          ref={rollBtnEl.current ? rollBtnEl : undefined}
          >
            🎲🎲🎲 Roll 🎲🎲🎲
          </Button>
        </Card>
        {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      </div>

      {/* Modal Code */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div >
            <img 
            className="h-auto max-w-full object-stretch rounded-t-lg" 
            src="/images/winner.webp" 
            alt="Winner Image"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            pill 
            outline 
            size='xl'
            gradientDuoTone='purpleToBlue' 
            className="mx-auto" 
            onClick={winConfirmHandler}
          >
            🎉 {winner} Wins! 🎉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
