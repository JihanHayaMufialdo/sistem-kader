import React, { useState } from "react";

export default function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Lakukan proses unggah di sini, misalnya, mengirim file ke backend
    console.log("File yang dipilih:", selectedFile);
    // Anda dapat menambahkan logika untuk mengirim file ke server di sini
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*" // Hanya menerima file gambar
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile} // Tombol diaktifkan hanya jika ada file yang dipilih
        className="ml-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Unggah
      </button>
    </div>
  );
}
