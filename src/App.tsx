import React, { useState, useCallback, useMemo } from "react";
import "./App.css";

import GameBlock from "./components/GameBlock";

type Block = {
  correctIndex: number;
  currentIndex: number;
  isNextToSpace: boolean;
  isSpace: boolean;
};

type State = {
  spaceIndex: number;
  gameBlocks: Block[];
};

const EDGE_SIZE = 3;
const GAME_BLOCKS_NUMBER = EDGE_SIZE * EDGE_SIZE;

const getX = (index: number): number => index % EDGE_SIZE;
const getY = (index: number): number => Math.floor(index / EDGE_SIZE);

const getIsNextToSpace = (
  currentIndex: number,
  currentSpaceIndex: number
): boolean => {
  const currentX = getX(currentIndex);
  const currentY = getY(currentIndex);
  const spaceX = getX(currentSpaceIndex);
  const spaceY = getY(currentSpaceIndex);

  return (
    (Math.abs(currentX - spaceX) === 1 && currentY === spaceY) ||
    (Math.abs(currentY - spaceY) === 1 && currentX === spaceX)
  );
};

const getInitialState = (
  currentBlockIndexes: number[],
  spaceIndex: number
): State => ({
  spaceIndex: spaceIndex,
  gameBlocks: currentBlockIndexes.map((_, index) => ({
    correctIndex: index,
    currentIndex: index,
    isNextToSpace: getIsNextToSpace(index, spaceIndex),
    isSpace: index === spaceIndex
  }))
});

function App() {
  const [{ gameBlocks, spaceIndex }, setState] = useState(
    getInitialState(
      Array.from({ length: GAME_BLOCKS_NUMBER }).map((_, index) => index),
      GAME_BLOCKS_NUMBER - 1
    )
  );

  const onMove = useCallback(
    (index) => {
      const previousSpace = gameBlocks[spaceIndex];
      gameBlocks[spaceIndex] = gameBlocks[index];
      gameBlocks[index] = previousSpace;

      setState({
        spaceIndex: index,
        gameBlocks: gameBlocks.map((block, i) => ({
          ...block,
          currentIndex: i,
          isNextToSpace: getIsNextToSpace(i, index),
          isSpace: i === index
        }))
      });
    },
    [gameBlocks, spaceIndex]
  );

  const isComplete = useMemo(
    () =>
      gameBlocks.every(
        ({ currentIndex, correctIndex }) => currentIndex === correctIndex
      ),
    [gameBlocks]
  );

  console.log({ isComplete });

  return (
    <div className="App">
      <div
        id="game-board"
        className={`h-${20 * EDGE_SIZE} w-${
          20 * EDGE_SIZE
        } relative border-solid border-2 ${isComplete && "border-green-400"}`}
      >
        {gameBlocks.map(
          ({ correctIndex, currentIndex, isSpace, isNextToSpace }) =>
            isSpace ? null : (
              <div
                key={correctIndex}
                onClick={isNextToSpace ? () => onMove(currentIndex) : () => {}}
                className={`absolute flex justify-center items-center w-20 h-20 trans ${
                  isNextToSpace && "cursor-pointer"
                } translate-x-${getX(currentIndex) * 20} translate-y-${
                  getY(currentIndex) * 20
                }`}
              >
                {correctIndex + 1}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
