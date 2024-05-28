// Import useEffect, useState, dan axios
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

export default function FormEditKota() {
    const router = useRouter();
    const { id_kota } = router.query;

    const [kota, setKota] = useState({
        provinsi: "Lampung",
        kode_kota: "",
        nama_kota: "",
        kode_provinsi: "" // Tambahkan kode_provinsi ke state kota
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id_kota) {
                    console.log(`Fetching data for kota with id_kota: ${id_kota}`);
                    const response = await axios.get(`http://localhost:8000/kota/${id_kota}`);
                    const dataToEdit = response.data;
                    console.log('Data fetched:', dataToEdit);
                    setKota({
                        provinsi: dataToEdit.provinsi || "Lampung",
                        kode_kota: dataToEdit.kode_kota,
                        nama_kota: dataToEdit.nama_kota,
                        kode_provinsi: dataToEdit.kode_provinsi || "" // Set nilai default untuk kode_provinsi jika kosong
                    });
                }
            } catch (error) {
                console.error("Error fetching data for edit:", error);
            }
        };
        fetchData();
    }, [id_kota]);

    const handleEditKota = async (event) => {
        event.preventDefault();
        const confirmation = window.confirm("Apakah anda yakin ingin mengubah data kota?");
        if (confirmation) {
            try {
                await axios.put(`http://localhost:8000/kota/${id_kota}`, kota);
                router.push('/admin/kota/');
            } catch (error) {
                console.error('There was an error updating the item!', error);
            }
        }
    };

    const handleButtonKembaliClick = () => {
        router.push('/admin/kota/');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setKota(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-green-700 text-xl font-bold">
                            Ubah Kota/Kabupaten
                        </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form className="flex flex-wrap mt-3" onSubmit={handleEditKota}>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="provinsi">
                                    Provinsi
                                </label>
                                <input
                                    type="text" id="provinsi" name="provinsi"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={kota.provinsi}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_provinsi">
                                    Kode Provinsi
                                </label>
                                <input
                                    type="text" id="kode_provinsi" name="kode_provinsi"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={kota.kode_provinsi}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                                    Kota/Kabupaten
                                </label>
                                <input
                                    type="text" id="nama_kota" name="nama_kota"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={kota.nama_kota}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kota">
                                    Kode Kota/Kabupaten
                                </label>
                                <input
                                    type="text" id="kode_kota" name="kode_kota"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={kota.kode_kota}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="text-center flex justify-end mr-3 mt-3 w-full">
                            <button
                                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto"
                                type="submit"
                            >
                                Simpan
                            </button>
                            <button
                                className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleButtonKembaliClick}
                            >
                                Kembali
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
