const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const walk = (
  maze: string[],
  wall: string,
  current: Point,
  end: Point,
  path: Point[],
  seen: boolean[][],
): boolean => {
  // 1. Current fuera de los limites
  if (
    current.x < 0 ||
    current.x >= maze[0].length ||
    current.y < 0 ||
    current.y >= maze.length
  )
    return false;

  // 2. Current esta en posición de muro
  if (maze[current.y][current.x] === wall) return false;

  // 3. Current ya fue visitado
  if (seen[current.y][current.x]) return false;

  // 4. Evaluar meta
  if (current.x === end.x && current.y === end.y) {
    path.push(current);
    return true;
  }

  // Plantear el caso recursivo
  // Pre recursion
  seen[current.y][current.x] = true;
  path.push(current);

  // recursion
  for (let i = 0; i < directions.length; i++) {
    const [x, y] = directions[i];
    const isValidCell = walk(
      maze,
      wall,
      {
        x: current.x + x,
        y: current.y + y,
      },
      end,
      path,
      seen,
    );

    if (isValidCell) return true;
  }

  // Pos recursion
  path.pop();
  return false;
};

const solve = (
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] => {
  const path: Point[] = [];
  const seen: boolean[][] = [];

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, path, seen);

  return path;
};

export default solve;
