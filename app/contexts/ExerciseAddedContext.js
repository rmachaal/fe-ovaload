import { createContext, useState, useContext } from 'react';

const ExerciseAddedContext = createContext();

export const ExerciseAddedProvider = ({ children }) => {
  const [callback, setCallback] = useState(null);

  return (
    <ExerciseAddedContext.Provider value={{ callback, setCallback }}>
      {children}
    </ExerciseAddedContext.Provider>
  );
};

export const useExerciseAdded = () => useContext(ExerciseAddedContext);
