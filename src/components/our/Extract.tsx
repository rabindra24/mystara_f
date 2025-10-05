import React, { useState } from "react";
import axios from "axios";

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponseText("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponseText(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {responseText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Text:</h3>
          <pre>{responseText}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
