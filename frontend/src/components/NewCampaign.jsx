import { useState } from "react";
import { createCampaign } from "../utils/auth";

export const NewCampaign = ({ onCampaignAdded }) => {
  const [newCampaign, setNewCampaign] = useState(false);
  const [difficulty, setDifficulty] = useState("")


  const handleNewCampaign = async (event) => {
    await createCampaign(event);
    setNewCampaign(!newCampaign);
    onCampaignAdded();
  };
  if (!newCampaign) {
    return (
      <main className="container card flex flex-col mx-auto w-72 h-72 justify-items-center">
        <section className="card-body bg-base-100 rounded">
          <h1 className="text-center">Add a new Campaign</h1>
          <div className="divider"></div>
          <div className="flex-grow flex items-center justify-center">
            <i
              onClick={() => setNewCampaign(!newCampaign)}
              className="fa-solid fa-plus fa-2x hover:scale-[1.7] transition ease-in-out"
            ></i>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="container card flex flex-col mx-auto w-72 h-80 justify-items-center">
        <section className="card-body bg-base-100 rounded justify-items-center">
          <div className="card-title">New Campaign</div>
          <div className="divider"></div>
          <form onSubmit={handleNewCampaign} className="space-y-2">
            <input
              type="text"
              name="title"
              placeholder="Campaign Title"
              className="input input-bordered input-xs w-full max-w-x"
            />
            <select
              value={difficulty}
              name="difficulty_level"
              onChange={(e) => setDifficulty(e.target.value)}
              className="select select-bordered select-xs w-full max-w-xs"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <textarea
              className="textarea textarea-bordered textarea-sm"
              placeholder="Bio"
              name="short_description"
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
};
