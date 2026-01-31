export const generatePuzzleShape = (complexity: string, orientations: number): number[][] => {
  const numSides = getNumSides(complexity);
  const vertices: number[][] = [];
  const radius = 40; // Base radius

  // Generate vertices around a circle
  for (let i = 0; i < numSides; i++) {
    // Exact angle for the complexity (so it looks regular-ish but deformed)
    const baseAngle = (i / numSides) * 2 * Math.PI;

    // Add randomness based on complexity
    let variance = 0;
    if (complexity === 'moderate') variance = 0.2;
    if (complexity === 'increased') variance = 0.3;
    if (complexity === 'high') variance = 0.4;
    if (complexity === 'frenzy') variance = 0.2;

    const angle = baseAngle + (Math.random() * variance - variance / 2);
    // Vary the radius slightly too
    const r = radius * (1 + (Math.random() * variance - variance / 2));

    vertices.push([
      Math.cos(angle) * r,
      Math.sin(angle) * r
    ]);
  }

  return vertices;
};

const getNumSides = (complexity: string): number => {
  switch (complexity) {
    case 'frenzy': return Math.floor(Math.random() * 2) + 3; // 3-4 sides
    case 'high': return Math.floor(Math.random() * 3) + 6; // 6-8 sides
    case 'increased': return Math.floor(Math.random() * 2) + 5; // 5-6 sides
    case 'moderate':
    default: return Math.floor(Math.random() * 2) + 4; // 4-5 sides
  }
};
