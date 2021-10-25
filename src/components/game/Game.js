import { useState, useEffect } from "react";
import classes from "./Game.module.css";

import GreenCandy from "./green-candy.png";
import RedCandy from "./red-candy.png";
import YellowCandy from "./yellow-candy.png";
import BlueCandy from "./blue-candy.png";
import PurpleCandy from "./purple-candy.png";
import OrangeCandy from "./orange-candy.png";
import blankImage from "./blank.png";
import GameImage from "../gameImages/GameImage";
import Score from "../score/Score";

const Game = () => {
  const [randomColourArrangement, setRandomColourArrangement] = useState([]);
  const [cellBeingDragged, setCellBeingDragged] = useState(null);
  const [cellBeingReplaced, setCellBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);

  const maxCellsPerRow = 8;
  const maxIndexColumnOfThree = 47;
  const maxIndexColumnOfFour = 39;
  const candyColours = [
    YellowCandy,
    BlueCandy,
    RedCandy,
    PurpleCandy,
    OrangeCandy,
    GreenCandy,
  ];

  const shiftCellsDownIfEmpty = () => {
    const cellsCanVisit = 55;

    for (let i = 0; i <= cellsCanVisit; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && randomColourArrangement[i] === blankImage) {
        const randomColour =
          candyColours[Math.floor(Math.random() * candyColours.length)];
        randomColourArrangement[i] = randomColour;
      }

      if (randomColourArrangement[i + maxCellsPerRow] === blankImage) {
        randomColourArrangement[i + maxCellsPerRow] =
          randomColourArrangement[i];
        randomColourArrangement[i] = blankImage;
      }
    }
  };

  const checkForColumnMatchesOfThree = () => {
    for (let i = 0; i <= maxIndexColumnOfThree; i++) {
      const columnOfThree = [i, i + maxCellsPerRow, i + maxCellsPerRow * 2];
      const decidedColour = randomColourArrangement[i];
      const isBlank = randomColourArrangement[i] === blankImage;

      if (
        columnOfThree.every(
          (square) =>
            randomColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        // match
        columnOfThree.forEach(
          (square) => (randomColourArrangement[square] = blankImage)
        );
        setScore((s) => s + 3);
        return true;
      }
    }
  };

  const checkForRowMatchesOfThree = () => {
    for (let i = 0; i < maxCellsPerRow * maxCellsPerRow; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColour = randomColourArrangement[i];
      const isBlank = randomColourArrangement[i] === blankImage;
      const outOfBounds = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (outOfBounds.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (square) =>
            randomColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        // match
        rowOfThree.forEach(
          (square) => (randomColourArrangement[square] = blankImage)
        );
        setScore((s) => s + 3);
        return true;
      }
    }
  };

  const checkForColumnMatchesOfFour = () => {
    for (let i = 0; i <= maxIndexColumnOfFour; i++) {
      const columnOfFour = [
        i,
        i + maxCellsPerRow,
        i + maxCellsPerRow * 2,
        i + maxCellsPerRow * 3,
      ];
      const decidedColour = randomColourArrangement[i];
      const isBlank = randomColourArrangement[i] === blankImage;

      if (
        columnOfFour.every(
          (square) =>
            randomColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        // match
        columnOfFour.forEach(
          (square) => (randomColourArrangement[square] = blankImage)
        );
        setScore((s) => s + 4);
        return true;
      }
    }
  };

  const checkForRowMatchesOfFour = () => {
    for (let i = 0; i < maxCellsPerRow * maxCellsPerRow; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColour = randomColourArrangement[i];
      const isBlank = randomColourArrangement[i] === blankImage;
      const outOfBounds = [
        6, 7, 14, 15, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55,
        62, 63, 64,
      ];

      if (outOfBounds.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (square) =>
            randomColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        // match
        rowOfFour.forEach(
          (square) => (randomColourArrangement[square] = blankImage)
        );
        setScore((s) => s + 4);
        return true;
      }
    }
  };

  const createBoard = () => {
    const randomColours = [];

    for (let i = 0; i < maxCellsPerRow * maxCellsPerRow; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];

      randomColours.push(randomColour);
    }

    setRandomColourArrangement(randomColours);
  };

  useEffect(() => {
    createBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnMatchesOfFour();
      checkForRowMatchesOfFour();
      checkForColumnMatchesOfThree();
      checkForRowMatchesOfThree();

      shiftCellsDownIfEmpty();
      setRandomColourArrangement([...randomColourArrangement]);
    }, 100);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkForColumnMatchesOfThree,
    checkForRowMatchesOfThree,
    checkForColumnMatchesOfFour,
    checkForRowMatchesOfFour,
    shiftCellsDownIfEmpty,
  ]);

  const dragStartHandler = (e) => {
    setCellBeingDragged(e.target);
  };

  const dragDropHandler = (e) => {
    setCellBeingReplaced(e.target);
  };

  const dragEndHandler = () => {
    const cellBeingDraggedId = parseInt(
      cellBeingDragged.getAttribute("data-id"),
      10
    );
    const cellBeingReplacedId = parseInt(
      cellBeingReplaced.getAttribute("data-id"),
      10
    );

    randomColourArrangement[cellBeingReplacedId] =
      cellBeingDragged.getAttribute("src");
    randomColourArrangement[cellBeingDraggedId] =
      cellBeingReplaced.getAttribute("src");

    // valid move checks:
    const validMoves = [
      cellBeingDraggedId - 1,
      cellBeingDraggedId - maxCellsPerRow,
      cellBeingDraggedId + 1,
      cellBeingDraggedId + maxCellsPerRow,
    ];

    const isValidMove = validMoves.includes(cellBeingReplacedId);

    const isAColumOfFour = checkForColumnMatchesOfFour();
    const isARowOfFour = checkForRowMatchesOfFour();
    const isAColumOfThree = checkForColumnMatchesOfThree();
    const isARowOfThree = checkForRowMatchesOfThree();

    if (
      cellBeingReplacedId &&
      isValidMove &&
      (isAColumOfFour || isAColumOfThree || isARowOfFour || isARowOfThree)
    ) {
      setCellBeingDragged(null);
      setCellBeingReplaced(null);
    } else {
      randomColourArrangement[cellBeingReplacedId] =
        cellBeingReplaced.getAttribute("src");

      randomColourArrangement[cellBeingDraggedId] =
        cellBeingDragged.getAttribute("src");

      setRandomColourArrangement([...randomColourArrangement]);
    }
  };

  return (
    <div className={classes.gameBoard}>
      <Score score={score} />

      <div className={classes.game}>
        {randomColourArrangement.map((colour, i) => (
          <GameImage
            key={`gameImage-${i}`}
            colour={colour}
            idx={i}
            dragDropHandler={dragDropHandler}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
