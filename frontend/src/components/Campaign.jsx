import { useState, useEffect } from "react";
import { NewCampaign} from "./NewCampaign";
import { fetchCampaigns, deleteCampaign } from "../utils/auth";

export const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState(false);

  // Fetch campaigns on mount
  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await fetchCampaigns(); // Await the fetched data
      setCampaigns(campaignData);
    };

    fetchData();
  }, []);

  const handleNewCampaign = async () => {
    const campaignData = await fetchCampaigns(); // Refetch characters data
    setCampaigns(campaignData); // Update state with new data
  };

  const handleDelete = async (campaignId) => {
    try {
      await deleteCampaign(campaignId); // Call the delete function
      // Refresh the character list after deletion
      const updatedCampaigns = await fetchCampaigns();
      setCampaigns(updatedCampaigns);
    } catch (error) {
      // Handle errors if needed
      console.error("Error deleting character:", error);
    }
  };

  const Display = () => {
    return (
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-0 p-4 h-74">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="card carousel-item w-full flex flex-col items-center"
          >
            <div className="card-body bg-base-100 w-72 rounded">
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-sm">Difficulty: {campaign.difficulty_level}</p>
              <p className="text-sm">Description: {campaign.short_description}</p>
              <button
                onClick={() => handleDelete(campaign.id)}
                className="btn btn-error mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="carousel-item">
          <NewCampaign onCampaignAdded={handleNewCampaign} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Display />
    </>
  );
};
