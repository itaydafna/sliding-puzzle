export const BLOCK_SIZE = 90;
export const NUM_EDGE_BLOCKS = 3;
export const getX = (index: number): number => index % NUM_EDGE_BLOCKS;
export const getY = (index: number): number => Math.floor(index / NUM_EDGE_BLOCKS);