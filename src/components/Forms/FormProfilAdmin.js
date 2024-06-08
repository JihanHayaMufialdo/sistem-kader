import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function FormProfil() {
    const [name, setName] = useState("Podo Wiseso");
    const [city, setCity] = useState("Bandar Lampung");
    const [role, setRole] = useState("Admin ILS");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleEditProfil = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Apakah anda yakin ingin mengubah profil?");
        if (confirmation) {
            // Simpan perubahan profil
            console.log("Profil updated:", { name, city, role });
        } else {
            // Pembatalan perubahan
            console.log("Profil update cancelled.");
        }
    };

    const navigateToEditProfil = () => {
        router.push('/edit-profil');
    };

    return (
        <div className="relative card-container mb-5 flex flex-col gap-4 md:flex-row">
            <div className="card w-full h-80 md:w-2/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center mt-20 pb-10">
                    <span className="w-24 h-24 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src="/img/profiladmin.jpg"
                        />
                    </span>
                    <input
                        className="mb-1 mt-6 text-xl font-medium text-gray-900 dark:text-white bg-transparent border-none text-center"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="mb-1 text-sm text-gray-500 dark:text-gray-400 bg-transparent border-none text-center leading-tight"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <hr className="mt-6 border-b-1 border-blueGreen-900" />
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-tight">{role}</span>
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
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
