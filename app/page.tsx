"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card, Modal } from "flowbite-react";
import { FiRefreshCcw } from "react-icons/fi";


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
  const pipEls: any = [];
  const rollBtnEl: any = useRef(null);
  for (let i = 0; i < listArray.length; i++) {
    pipEls.push(useRef());
  }

  const [winner, setWinner] = useState("Casey");
  const [openModal, setOpenModal] = useState(false);
  const [wonArray, setWonArray] = useState<number[]>([]);

  useEffect(() => {
    const checkLocalStorage = async () => {
      const dbWinCheck = await localStorage.getItem("wonArray");
      const localWonArray = dbWinCheck ? JSON.parse(dbWinCheck) : null;
      // if local storage found, set wonArray to localWonArray
      if (
        localWonArray &&
        localWonArray.length &&
        localWonArray.length > wonArray.length
      ) {
        setWonArray(localWonArray);
        // map localWonArray to pipEls and add winner class
        localWonArray.forEach((item: number) => {
          pipEls[item].current.classList.add("winner");
        });
      } else {
        // if no local storage found, set local storage to wonArray
        localStorage.setItem("wonArray", JSON.stringify(wonArray));
      }
    };
    checkLocalStorage();
  }, [wonArray]);

  const resetHandler = () => {
    console.log("resetting");
    localStorage.setItem("wonArray", JSON.stringify([]));
    setWonArray([]);
    pipEls.forEach((pip: any) => {
      pip.current.classList.remove("winner");
    });
  };

  const winConfirmHandler = () => {
    rollBtnEl.current ? rollBtnEl.current.removeAttribute("disabled") : null;
    setOpenModal(false);
  };

  const rollHandler = async () => {
    rollBtnEl.current ? rollBtnEl.current.setAttribute("disabled", "") : null;
    const min = 3;
    const max = 7;
    const randomRoll = Math.floor(Math.random() * (max - min) + min);
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
    const winIndex = Math.floor(Math.random() * pipEls.length);
    if (!pipEls[winIndex].current.classList.contains("winner")) {
      console.log(`${pipEls[winIndex].current.innerHTML} wins!}`);
      setWinner(pipEls[winIndex].current.innerHTML);
      setOpenModal(true);
      pipEls[winIndex].current.classList.add("winner");
      setWonArray([...wonArray, winIndex]);
    } else {
      console.log("already won, rolling again");
      return win();
    }
  }

  return (
    <>
      <div className="container my-6 mx-auto">
        <Card className="max-w-md w-2/3 mx-auto">
          <FiRefreshCcw onClick={resetHandler} className="h-7 w-7 opacity-70 hover:cursor-pointer hover:opacity-80" />
          <h5 className="text-2xl text-center pt-0 pb-2 mt-0 border-b font-bold text-gray-900 dark:text-white">
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
            ref={rollBtnEl}
          >
            🎲🎲🎲 Roll 🎲🎲🎲
          </Button>
        </Card>
      </div>

      {/* Modal Code */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div>
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
            size="xl"
            gradientDuoTone="purpleToBlue"
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
