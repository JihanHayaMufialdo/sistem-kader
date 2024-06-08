import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Admin from "../layouts/Admin.js";

export default function EditProfil() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [role, setRole] = useState("");
    const [photo, setPhoto] = useState(null); // State untuk menyimpan file foto profil

    useEffect(() => {
        const { nama, kota, role } = router.query;
        if (nama) setName(nama);
        if (kota) setCity(kota);
        if (role) setRole(role);
    }, [router.query]);

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', name);
        formData.append('kota', city);
        formData.append('role', role);
        if (photo) {
            formData.append('foto_profil', photo);
        }

        try {
            const response = await fetch('http://localhost:8000/profiles', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile created successfully');
                router.back();
            } else {
                console.error('Error creating profile');
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleButtonKembali = () => {
        router.back();
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
                                        <img src={URL.createObjectURL(photo)} alt="Foto Profil" className="rounded-full h-24 w-24 mx-auto" />
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
                                onClick={handleSave}
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
