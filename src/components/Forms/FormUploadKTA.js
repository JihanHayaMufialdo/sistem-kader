import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function FormUploadKTA() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [memberNumber, setMemberNumber] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedMemberNumber = localStorage.getItem('memberNumber');
        if (storedUserName && storedMemberNumber) {
            setUserName(storedUserName);
            setMemberNumber(storedMemberNumber);
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size <= 2 * 1024 * 1024) {
            setSelectedFile(file);
            setErrorMessage('');
        } else {
            setErrorMessage('Ukuran file melebihi 2 MB. Mohon pilih file dengan ukuran yang lebih kecil.');
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            console.log("File yang dipilih:", selectedFile);
        } else {
            setErrorMessage('Mohon pilih file terlebih dahulu.');
        }
    };

    const handleSaveClick = () => {
        console.log("Data disimpan.");
        setSuccessMessage('Data berhasil disimpan.');
        setTimeout(() => {
            router.push('/ssr/kader');
        }, 1000);
    };

    const handleButtonKembaliClick = () => {
        router.push('/ssr/kader/upload');
    };

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="w-full max-w-lg flex flex-col">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold text-center mb-4">Unggah Foto Kartu Pengenal</h1>
                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                    )}
                    <form className="mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">Nama</label>
                            <select
                                id="userName" name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Pilih Nama</option>
                                <option value="Nama 1">Chanyeol</option>
                                <option value="Nama 2">Dika</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="memberNumber">Nomor Anggota</label>
                            <select
                                id="memberNumber" name="memberNumber"
                                value={memberNumber}
                                onChange={(e) => setMemberNumber(e.target.value)}
                                className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Pilih Nomor Anggota</option>
                                <option value="Nomor1">18 02 03 001</option>
                                <option value="Nomor2">18 02 03 002</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectFile">Pilih Foto Kartu Pengenal (Maksimal 2 MB)</label>
                            <input
                                type="file" id="selectFile" name="selectFile"
                                className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleUploadClick}
                                disabled={!selectedFile || errorMessage}
                            >
                                Unggah
                            </button>
                            <div style={{ marginLeft: '10px' }}>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleButtonKembaliClick}
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full max-w-lg flex justify-center">
                <img src="/img/Depan.png" alt="Depan" className="w-full max-w-sm" />
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSaveClick}
                >
                    Simpan
                </button>
            </div>
        </div>
    );
}
