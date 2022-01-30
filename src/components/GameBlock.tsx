import { useMemo } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

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
  children
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
      isNextToSpace={isNextToSpace}
      backgroundColor={backgroundColor}
      onClick={onClick}
      initial={false}
      animate={{ x: getX(index) * BLOCK_SIZE, y: getY(index) * BLOCK_SIZE }}
      transition={{ type: "tween" }}
    >
      {children}
    </StyledGameBlock>
  );
};

const StyledGameBlock = styled(motion.div)<{
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
`;

export default GameBlock;
