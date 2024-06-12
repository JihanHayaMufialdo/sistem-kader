import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function FormUploadKTA() {
    const router = useRouter();
    const { id } = router.query;

    const [nama, setNama] = useState('');
    const [nomorInduk, setNomorInduk] = useState('');
    const [jenis_kader, setJenisKader] = useState('');
    const [fotoURL, setFotoURL] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetchKaderData(id);
        }
    }, [id]);

    const fetchKaderData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/kader/${id}`);
            const kader = response.data;
            setNama(kader.nama);
            setNomorInduk(kader.no_induk);
            setJenisKader(kader.jenis_kader);
            setFotoURL(kader.fotoURL);
        } catch (error) {
            console.error('Error fetching kader data:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoURL(reader.result); // Menggunakan URL gambar yang diunggah untuk ditampilkan
            };
            reader.readAsDataURL(file);
            setSuccessMessage('Foto berhasil diunggah');
        } else {
            setErrorMessage('Pilih file foto terlebih dahulu');
        }
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('nomorInduk', nomorInduk);
        formData.append('jenis_kader', jenis_kader);
        if (fotoURL) {
            const blob = await fetch(fotoURL).then(res => res.blob());
            formData.append('foto', blob, 'uploaded_image.png');
        }

        try {
            const response = await axios.post('http://localhost:8000/kta', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Data berhasil disimpan');
            setFotoURL(response.data.fotoURL);  // Menggunakan URL dari response backend
        } catch (error) {
            console.error('Error saving KTA data:', error);
            setErrorMessage('Gagal menyimpan data');
        }
    };

    const handleButtonKembaliClick = () => {
        router.push('/ssr/kader');
    };

    const handleButtonKTAClick = () => {
        router.push('/ssr/kader/KTA');
    };

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                 style={{ backgroundImage: "url('/depan.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h1 className="text-2xl font-bold text-center mb-4">Form ID Card</h1>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                )}
                <form className="mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">Nama</label>
                        <input
                            type="text" id="nama" name="nama"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomorInduk">Nomor Induk</label>
                        <input
                            type="text" id="nomorInduk" name="nomorInduk"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            value={nomorInduk}
                            onChange={(e) => setNomorInduk(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jeniskader">Jenis Kader</label>
                        <input
                            type="text" id="JenisKader" name="JenisKader"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            value={jenis_kader}
                            onChange={(e) => setJenisKader(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">Foto</label>
                        <input
                            type="file" id="foto" name="foto"
                            accept="image/*"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
                <div className="flex items-center justify-center mt-4 space-x-4">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleButtonKembaliClick}
                    >
                        Kembali
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSaveClick}
                    >
                        Simpan
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-center mb-8">ID Card</h2>
                <div className="flex justify-center">
                    {/* Bagian Depan Kartu */}
                    <div className="bg-white shadow-md rounded p-8 mr-4" style={{ width: '300px', height: '500px', backgroundImage: 'url(/img/KTA.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <h2 className="px-8 py-5 m-4 mt-8 text-lxl font-bold text-center">KARTU TANDA ANGGOTA</h2>
                        <div className="photo text-center"> 
                            {fotoURL && <img src={fotoURL} alt="Foto" className="mx-auto" style={{ width: '150px', height: '150px', borderRadius: '100%' }} />}
                        </div>
                        <div className="text-center mt-5">
                            <p className="font-bold">{nama}</p>
                            <p>{nomorInduk}</p>
                            <p>{jenis_kader}</p>
                        </div>
                    </div>
                    
                    {/* Bagian Belakang Kartu */}
                    <div className="bg-white shadow-md rounded p-4" style={{ width: '300px', height: '500px', backgroundImage: 'url(/img/Belakang.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        {/* Konten untuk bagian belakang kartu di sini */}
                    </div>
                </div>
            </div>
        </div>
    );
}
