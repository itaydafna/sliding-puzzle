import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";

import "./App.css";

import GameBlock from "./components/GameBlock";

import { getX, getY, BLOCK_SIZE, NUM_EDGE_BLOCKS } from "./common";

type Block = {
  correctIndex: number;
  currentIndex: number;
  isNextToSpace: boolean;
  isSpace: boolean;
};

const GAME_BLOCKS_NUMBER = NUM_EDGE_BLOCKS * NUM_EDGE_BLOCKS;
const SPACE_INDEX = GAME_BLOCKS_NUMBER - 1;

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
): Block[] =>
  currentBlockIndexes.map((_, index) => ({
    correctIndex: index,
    currentIndex: index,
    isNextToSpace: getIsNextToSpace(index, spaceIndex),
    isSpace: index === spaceIndex,
  }));

function App() {
  const [gameBlocks, setGameBlocks] = useState(
    getInitialState(
      Array.from({ length: GAME_BLOCKS_NUMBER }).map((_, index) => index),
      SPACE_INDEX
    )
  );

  const onMove = useCallback((clickedIndex) => {
    setGameBlocks((prevState) => {
      const prevSpaceIndex = prevState[SPACE_INDEX].currentIndex;
      return prevState.map((block) => {
        let nextIndex = block.currentIndex;
        if (block.currentIndex === clickedIndex) {
          nextIndex = prevSpaceIndex;
        }
        if (block.currentIndex === prevSpaceIndex) {
          nextIndex = clickedIndex;
        }
        return {
          ...block,
          currentIndex: nextIndex,
          isNextToSpace: getIsNextToSpace(nextIndex, clickedIndex),
        };
      });
    });
  }, []);

  const isComplete = useMemo(
    () =>
      gameBlocks.every(
        ({ currentIndex, correctIndex }) => currentIndex === correctIndex
      ),
    [gameBlocks]
  );

  return (
    <div className="App">
      <GameBoard isComplete={isComplete}>
        {gameBlocks.map(
          ({ correctIndex, currentIndex, isSpace, isNextToSpace }) =>
            isSpace ? null : (
              <GameBlock
                key={correctIndex}
                index={currentIndex}
                isNextToSpace={isNextToSpace}
                onClick={isNextToSpace ? () => onMove(currentIndex) : () => {}}
              >
                {correctIndex + 1}
              </GameBlock>
            )
        )}
      </GameBoard>
    </div>
  );
}

const GameBoard = styled.div<{ isComplete: boolean }>`
  position: relative;
  height: ${BLOCK_SIZE * NUM_EDGE_BLOCKS}px;
  width: ${BLOCK_SIZE * NUM_EDGE_BLOCKS}px;
  ${({ isComplete }) => isComplete && "border: 1px solid green"};
`;

export default App;
