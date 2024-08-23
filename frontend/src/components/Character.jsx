import { useState, useEffect } from "react"
import { NewCharacter } from "./NewCharacter";
import { fetchCharacters, deleteCharacter, getClassHitDice } from "../utils/auth";

export const Character = () => {
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState(false)

  // Fetch characters on component mount
  useEffect(() => {
    const fetchData = async () => {
      const charactersData = await fetchCharacters(); // Await the fetched data
      setCharacters(charactersData)

    };

    fetchData();
  }, []);

  const handleNewCharacter = async () => {
    const charactersData = await fetchCharacters(); // Refetch characters data
    setCharacters(charactersData); // Update state with new data
  };

  const handleDelete = async (characterId) => {
    try {
      await deleteCharacter(characterId); // Call the delete function
      // Refresh the character list after deletion
      const updatedCharacters = await fetchCharacters();
      setCharacters(updatedCharacters);
    } catch (error) {
      // Handle errors if needed
      console.error("Error deleting character:", error);
    }
  };

  const Display = () => {
    return (
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-0 p-4 h-74">
        {characters.map((character) => (
          <div
            key={character.id}
            className="card carousel-item w-full flex flex-col items-center"
          >
            <div className="card-body bg-base-100 w-72 rounded">
              <h2 className="text-xl font-semibold">{character.name}</h2>
              <p className="text-sm">Level: {character.level}</p>
              <p className="text-sm">Class: {character.character_class}</p>
              <p className="text-sm">Hit Dice: {character.hit_dice}</p>
              <p className="text-sm">{character.bio}</p>
              <button
                onClick={() => handleDelete(character.id)}
                className="btn btn-error mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="carousel-item">
          <NewCharacter onCharacterAdded={handleNewCharacter} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Display />
    </>
  );
}
