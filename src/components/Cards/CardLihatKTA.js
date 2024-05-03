import React, { useRef } from "react";
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';

export default function KartuTandaPengenal() {
    const router = useRouter();
    const contentRef = useRef(null);

    const handleButtonKembaliClick = () => {
        router.push('/admin/kader');
    };

    const handlePrintToPDF = () => {
        const pdf = new jsPDF();
        const content = contentRef.current;

        if (content) {
            pdf.html(content, {
                callback: function (pdf) {
                    pdf.save("Kartu_Tanda_Pengenal.pdf");
                }
            });
        }
    };

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold text-center mb-4">Kartu Tanda Pengenal</h1>
                    <div ref={contentRef} className="flex justify-center mb-4">
                        <div className="w-full bg-gray-200 p-4 rounded">
                            <div className="flex justify-center">
                                <img src="/img/Depan.png" alt="Depan" className="w-32 h-auto" />
                            </div>
                            <div className="text-center mt-4">
                                <h2 className="text-lg font-bold">Nama Anggota</h2>
                                <p className="text-sm">Nomor Anggota: 123456</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleButtonKembaliClick}
                        >
                            Kembali
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            onClick={handlePrintToPDF}
                        >
                            Cetak PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
