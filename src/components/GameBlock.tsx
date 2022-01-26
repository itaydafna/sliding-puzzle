type Props = {
  x: number;
  y: number;
};
const GameBlock: React.FC<Props> = ({ x, y, children }) => {
  return <div>{children}</div>;
};

export default GameBlock;
