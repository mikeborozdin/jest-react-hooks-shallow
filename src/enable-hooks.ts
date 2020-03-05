import mockUseEffect from "./mock-use-effect/mock-use-effect";

interface Jest {
  requireActual: (module: string) => object;
  mock: (module: string, mock: object) => void;
}

const enableHooks = (jestInstance: Jest): void => {
  const react = jestInstance.requireActual('react');

  jestInstance.mock('react', () => ({
    ...react,
    useEffect: mockUseEffect()
  }));
};

export default enableHooks;
