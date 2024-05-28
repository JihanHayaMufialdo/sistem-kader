import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const initialFormData = {
  nama_provinsi: '',
  kode_provinsi: '',
  nama_kota: '',
  kode_kota: '',
  nama_kecamatan: '',
  kode_kecamatan: '',
};

export default function FormTambahKota() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [manualKodeProvinsi, setManualKodeProvinsi] = useState(false);

  useEffect(() => {
    const fetchProvinsiData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/provinsi');
        const options = response.data.map(prov => ({
          value: prov.kode_provinsi,
          label: prov.nama_provinsi
        }));
        setProvinsiOptions(options);
      } catch (error) {
        console.error('Error fetching provinsi data:', error);
      }
    };
    fetchProvinsiData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProvinsiChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedProvinsi(selectedOption);
      setFormData({
        ...formData,
        nama_provinsi: selectedOption.label,
        kode_provinsi: selectedOption.value
      });
    } else {
      setSelectedProvinsi(null);
      setFormData({
        ...formData,
        nama_provinsi: '',
        kode_provinsi: ''
      });
    }
  };

  const handleManualKodeProvinsi = () => {
    setManualKodeProvinsi(!manualKodeProvinsi);
    if (!manualKodeProvinsi) {
      setFormData({ ...formData, kode_provinsi: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Apakah anda yakin ingin menambahkan kota?");
    if (confirmation) {
      try {
        let id_provinsiToSend = selectedProvinsi ? selectedProvinsi.value : null;
        if (!selectedProvinsi) {
          const existingProvinsi = provinsiOptions.find(option => option.label === formData.nama_provinsi);
          if (existingProvinsi) {
            id_provinsiToSend = existingProvinsi.value;
          }
        }

        const dataToSend = {
          ...formData,
          id_provinsi: id_provinsiToSend
        };

        const response = await axios.post('http://localhost:8000/tambah-data', dataToSend);
        console.log(response.data);
        setFormData(initialFormData);
        router.push('/admin/kota/');
      } catch (error) {
        console.error('Error creating kota:', error);
      }
    }
  };

  const handleButtonKembaliClick = () => {
    router.push('/admin/kota/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Tambah Kota/Kabupaten
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="provinsi">
                    Provinsi
                  </label>
                  <CreatableSelect
                    id="nama_provinsi"
                    name="nama_provinsi"
                    value={
                      formData.nama_provinsi
                        ? { value: formData.kode_provinsi, label: formData.nama_provinsi }
                        : null
                    }
                    onChange={handleProvinsiChange}
                    options={provinsiOptions}
                    className="border-0 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                    Kota/Kabupaten
                  </label>
                  <input
                    type="text"
                    id="nama_kota"
                    name="nama_kota"
                    value={formData.nama_kota}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kecamatan">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    id="nama_kecamatan"
                    name="nama_kecamatan"
                    value={formData.nama_kecamatan}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_provinsi">
                  Kode Provinsi 
                </label>
                <div className="flex items-center">
                  <input
                  type="text"
                  id="kode_provinsi"
                  name="kode_provinsi"
                  value={formData.kode_provinsi}
                  onChange={handleChange}
                  disabled={!manualKodeProvinsi}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
               />
                <label className="block uppercase text-green-600 text-xs font-bold mr-2" htmlFor="manualKodeProvinsi">
                  Manual
                </label>
                <input
                  type="checkbox"
                  id="manualKodeProvinsi"
                  name="manualKodeProvinsi"
                  checked={manualKodeProvinsi}
                  onChange={handleManualKodeProvinsi}
                />
                </div>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kota">
                    Kode Kota
                  </label>
                  <input
                    type="text"
                    id="kode_kota"
                    name="kode_kota"
                    value={formData.kode_kota}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kecamatan">
                    Kode Kecamatan
                  </label>
                  <input
                    type="text"
                    id="kode_kecamatan"
                    name="kode_kecamatan"
                    value={formData.kode_kecamatan}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
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
