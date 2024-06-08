import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function FormProfil() {
    const [profile, setProfile] = useState({
        name: "",
        city: "",
        role: "",
        foto_profil: "",
    });

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profiles/${localStorage.getItem('nama_pengguna')}`);
                const data = await response.json();
                const userProfile = JSON.parse(data.user); // Mengonversi string JSON menjadi objek
                setProfile(userProfile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleEditProfil = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Apakah anda yakin ingin mengubah profil?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:8000/profiles/${localStorage.getItem('nama_pengguna')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password_lama: oldPassword,
                        password_baru: newPassword,
                    }),
                });
                const data = await response.json();
                console.log("Password updated:", data.message);
                // Reset form fields
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } catch (error) {
                console.error('Error updating password:', error);
            }
        } else {
            console.log("Profil update cancelled.");
        }
    };

    const navigateToEditProfil = () => {
        router.push({
            pathname: '/edit-profil',
            query: { ...profile },
        });
    };

    return (
        <div className="relative card-container mb-5 flex flex-col gap-4 md:flex-row">
            <div className="card w-full h-80 md:w-2/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center mt-20 pb-10">
                    <span className="w-24 h-24 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={profile.foto_profil} // Tampilkan foto profil sesuai dengan nama_pengguna
                        />
                    </span>
                    <input
                        className="mb-1 mt-6 text-xl font-medium text-gray-900 dark:text-white bg-transparent border-none text-center"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <input
                        className="mb-1 text-sm text-gray-500 dark:text-gray-400 bg-transparent border-none text-center leading-tight"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                    <hr className="mt-6 border-b-1 border-blueGreen-900" />
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-tight">{profile.role}</span>
                    <button
                        className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 mt-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={navigateToEditProfil}
                    >
                        Ubah
                    </button>
                </div>
            </div>
            <div className="card p-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="text-center flex justify-between">
                    <h6 className="text-green-700 text-xl font-bold">
                        Ubah Kata Sandi
                    </h6>
                </div>
                <form onSubmit={handleEditProfil}>
                    <div className="mb-6 mt-5">
                        <label htmlFor="old-pw" className="block mb-2 text-sm font-medium text-green-600 dark:text-white">
                            Kata Sandi Lama
                        </label>
                        <input 
                            type="password" 
                            id="old-pw" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 mt-5">
                        <label htmlFor="new-pw" className="block mb-2 text-sm font-medium text-green-600 dark:text-white">
                            Kata Sandi Baru
                        </label>
                        <input 
                            type="password" 
                            id="new-pw" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 mt-5">
                        <label htmlFor="confirm-pw" className="block mb-2 text-sm font-medium text-green-600 dark:text-white">
                            Konfirmasi Kata Sandi Baru
                        </label>
                        <input 
                            type="password" 
                            id="confirm-pw" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center flex justify-end mr-3 mt-3">
                        <button
                            className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={handleEditProfil}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
