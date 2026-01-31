export const checkOrientation = (current: number, correct: number): boolean => {
  return current === correct;
};

export const getRotationDegrees = (orientationIndex: number, totalOrientations: number): number => {
  return orientationIndex * (360 / totalOrientations);
};
