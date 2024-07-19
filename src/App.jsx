import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://resume-scrapping-backend.onrender.com/api/v1/resume/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-24 text-clifford">Resume Parser</h1>
      <div className="flex flex-col gap-4 mt-16 justify-center h-[10%]">
        <input type="file" id="file" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpload}>
          {isLoading ? "Please wait..." : "Upload"}
        </button>
      </div>
      {data && (
        <div className="mt-16 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold text-center">User Details</h2>
          <p id="email">
            <span className="font-bold">Email Id : </span> {data.email}
          </p>
          <p id="phone">
            <span className="font-bold">Phone : </span> {data.phone}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
