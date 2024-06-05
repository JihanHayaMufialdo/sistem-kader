import React, { useState } from "react";
import { useRouter } from 'next/router';
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import FormProfil from "../components/Forms/FormProfilAdmin.js";
import Admin from "../layouts/Admin.js";

export default function EditProfil() {
    const [name, setName] = useState("Podo Wiseso");
    const [city, setCity] = useState("Bandar Lampung");
    const [role, setRole] = useState("Admin ILS");
    const [photo, setPhoto] = useState(""); // State untuk menyimpan URL foto profil
    const router = useRouter();

    const handleSave = (e) => {
        e.preventDefault();
        // Logic to save profile changes
        console.log("Profil updated:", { name, city, role, photo });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        // Lakukan logika untuk mengunggah foto dan mendapatkan URL foto
        // Misalnya menggunakan Firebase Storage atau menyimpan foto di server
        // Setelah itu, simpan URL foto ke dalam state
        // Contoh sederhana:
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleButtonKembali = () => {
        router.push('/profil');
    };

    return (
        <div className="relative">
            <AdminNavbar />
            <Admin>
                <div className="container mx-auto p-4 relative z-10 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Form update di sebelah kanan */}
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Kota</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto Profil</label>
                                    <input
                                        type="file"
                                        id="photo"
                                        accept="image/*"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </div>
                            {/* Tampilan profil di sebelah kiri */}
                            <div>
                                {photo && (
                                    <div className="mb-8">
                                        <img src={photo} alt="Foto Profil" className="rounded-full h-24 w-24 mx-auto" />
                                    </div>
                                )}
                                <div className="text-center">
                                    <h2 className="text-lg font-bold">Profil</h2>
                                    <p>{name}</p>
                                    <p>{city}</p>
                                    <p>{role}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="bg-blueGray-400 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleButtonKembali}
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </Admin>
        </div>
    );
}
