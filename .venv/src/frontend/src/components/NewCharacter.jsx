import { useState } from "react"
import { createCharacter } from "../utils/auth";

export const NewCharacter = () => {
  const [newCharacter, setNewCharacter] = useState(false);
  const [characterClass, setCharacterClass] = useState("");

  // // Example usage
  // createCharacter({
  //   name: "Gandalf",
  //   level: 20,
  //   character_class: "Wizard",
  //   bio: "A wise and powerful wizard",
  //   spells: [1, 2, 3], // Assuming these are spell IDs
  // });

  const handleNewCharacter = async (event) => {
    console.log("New Character Caled")
    await createCharacter(event)
    console.log("Character created")
    setNewCharacter(!newCharacter);
  };
  if (!newCharacter) {
    return (
      <main className="container card flex flex-col mx-auto w-72 h-72 justify-items-center">
        <section className="card-body bg-base-100 rounded">
          <h1 className="text-center">Add a new Character</h1>
          <div className="divider"></div>
          <div className="flex-grow flex items-center justify-center">
            <i
              onClick={() => setNewCharacter(!newCharacter)}
              className="fa-solid fa-plus fa-2x hover:scale-[1.7] transition ease-in-out"
            ></i>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="container card flex flex-col mx-auto w-72 h-72 justify-items-center">
        <section className="card-body bg-base-100 rounded justify-items-center">
          <div className="card-title">New Character</div>
          <div className="divider"></div>
          <form onSubmit={handleNewCharacter} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Character Name"
              className="input input-bordered input-xs w-full max-w-x"
            />
            <select
              value={characterClass}
              name="character_class"
              onChange={(e) => setCharacterClass(e.target.value)}
              className="select select-bordered select-xs w-full max-w-xs"
            >
              <option>Barbarian</option>
              <option>Bard</option>
              <option>Cleric</option>
              <option>Druid</option>
              <option>Fighter</option>
              <option>Monk</option>
              <option>Paladin</option>
              <option>Ranger</option>
              <option>Rogue</option>
              <option>Sorcerer</option>
              <option>Warlock</option>
              <option>Wizard</option>
            </select>
            <textarea
              className="textarea textarea-bordered textarea-sm"
              placeholder="Bio"
              name="bio"
            ></textarea>
            <div className="flex justify-end">
              <button className="btn btn-sm" type="submit">
                Create
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}