import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import SpaceCreation from "./SpaceCreation";
<<<<<<< HEAD
import CheckToken from "../CheckToken";
<CheckToken/>
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

function SpaceEditor() {
  const { mode, spaceId } = useParams(); // Get mode ('edit' or 'create') and spaceId from URL params
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mode === "edit") {
      // Fetch space data when in 'edit' mode
      fetchSpaceData(spaceId);
    } else {
      // No data to fetch for 'create' mode
      setInitialData({});
      setIsLoading(false);
    }
  }, [mode, spaceId]);

  const fetchSpaceData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const { data } = await api.get(`/space/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInitialData(data); // Set the fetched data as initial data
    } catch (error) {
      console.error("Error fetching space data:", error.response?.data?.message || error.message);
      alert("Failed to fetch space data");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <>
      <CheckToken />  {/* Ensure CheckToken runs before rendering */}
      {isLoading ? <div>Loading...</div> : <SpaceCreation mode={mode} initialData={initialData} />}
    </>
  );
=======
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <SpaceCreation mode={mode} initialData={initialData} />;
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
}

export default SpaceEditor;
