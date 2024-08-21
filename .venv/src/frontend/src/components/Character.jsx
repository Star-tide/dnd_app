import { useState } from "react"
import { NewCharacter } from "./NewCharacter";

export const Character = () => {

  const Display = () => {
    return (
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
        <div className="carousel-item card">
          <NewCharacter />
        </div>
          
      </div>
    );

  }
  return (
    <>
      <Display />
    </>
  );
}
