import { useMemo } from "react";
import styled, { css } from "styled-components";

import { BLOCK_SIZE, getX, getY } from "../common";

type Props = {
  index: number;
  isNextToSpace: boolean;
  onClick: () => void;
};
const GameBlock: React.FC<Props> = ({
  index,
  isNextToSpace,
  onClick,
  children,
}) => {
  const backgroundColor = useMemo(
    () =>
      "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      }),
    []
  );

  return (
    <StyledGameBlock
      index={index}
      isNextToSpace={isNextToSpace}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </StyledGameBlock>
  );
};

const StyledGameBlock = styled.div<{
  index: number;
  isNextToSpace: boolean;
  backgroundColor: string;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BLOCK_SIZE}px;
  height: ${BLOCK_SIZE}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ isNextToSpace }) => isNextToSpace && "cursor: pointer"};

  ${({ index }) => css`
    transform: translate(
      ${getX(index) * BLOCK_SIZE}px,
      ${getY(index) * BLOCK_SIZE}px
    );
  `}

  transition: transform 400ms;
`;

export default GameBlock;
