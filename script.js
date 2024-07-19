document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://resume-scrapping-backend.onrender.com/api/v1/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // document.getElementById("name").textContent = `Name: ${result.name}`;
        document.getElementById("email").textContent = `Email id: ${result.email}`;
        document.getElementById("phone").textContent = `Phone No: ${result.phone}`;

        document.getElementById("userDetails").classList.remove("hidden");
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    alert("Please select a file to upload.");
  }
});
