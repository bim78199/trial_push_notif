import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
const Print = () => {
  const [tahunAnggaran,setTahunAnggaran]=useState("");
  const [sudahTerima,setSudahTerima]=useState("");
  const [uangSebanyak,setUangSebanyak]=useState("");
  const [gunaMembayar,setGunaMembayar]=useState("");
  const [data,setData]=useState([]);
  const [totalPerkalianHarga,setTotalPerkalianHarga]=useState("");
  const [tglSekarang,setTglSekarang]=useState("");
  const [bulanSekarang,setBulanSekarang]=useState("");
  const [tahunSekarang,setTahunSekarang]=useState("");
  const PanggilDateNow=()=>{
    let tglSekarang = new Date();
  setTahunAnggaran(tglSekarang.getFullYear());
  setTglSekarang(tglSekarang.getDate());
  let bulanSekarang = tglSekarang.getMonth()+1;
  switch(bulanSekarang){
    case 1:
setBulanSekarang("Januari");
break;
case 2:
setBulanSekarang("Februari");
break;
case 3:
setBulanSekarang("Maret");
break;
case 4:
setBulanSekarang("April");
break;
case 5:
setBulanSekarang("Mei");
break;
case 6:
setBulanSekarang("Juni");
break;
case 7:
setBulanSekarang("Juli");
break;
case 8:
setBulanSekarang("Agustus");
break;
case 9:
setBulanSekarang("September");
break;
case 10:
setBulanSekarang("Oktober");
break;
case 11:
setBulanSekarang("November");
break;
case 12:
setBulanSekarang("Desember");
break;
    default:break;
  }
  
  setTahunSekarang(tglSekarang.getFullYear());
  
  }
   const navigate=useNavigate();

   //function olah data list view alat 
   const PanggilData=()=>{
    setData(JSON.parse(localStorage.getItem("tambah")));
   }
// function setting print
   const SettingPrint=()=>{
    const handlePrint = () => {
      document.body.classList.add("printing");
    window.print();
    };

    // Menghapus kelas cetak dan merefresh halaman setelah mencetak atau membatalkan pencetakan
    const cleanupAndRefresh = () => {
      document.body.classList.remove("printing");
navigate("/");
      window.location.reload();
    };

    window.onbeforeprint = handlePrint();
    window.onafterprint = cleanupAndRefresh();

    return () => {
      window.onbeforeprint = null;
      window.onafterprint = null;
    };
   };

   useEffect(()=>{
    PanggilDateNow();
    setSudahTerima(localStorage.getItem("penyetor").toUpperCase());
    setUangSebanyak(localStorage.getItem("convertNominal").toUpperCase());
    setGunaMembayar(localStorage.getItem("keperluan"));
    setTotalPerkalianHarga(localStorage.getItem("TotalHargaDiListView"));
    PanggilData();
    const timer = setTimeout(() => {
      SettingPrint();
    }, 200);

    return () => {
      clearTimeout(timer); // Pastikan menghapus timer jika komponen unmount sebelumnya
    };
   },[]);
 
   

  return (
    <div className={style["bigContainer"]}>
      <style>
        {`
          @page {
            
            size: A5 potrait;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
          }

          /* Menghilangkan elemen tanggal di kiri atas */
          .date {
            display: none;
          }

          /* Menghilangkan tulisan "React App" di kanan atas */
          .react-app {
            display: none;
          }
          @media print {
            body {
              transform: scale(1); /* Skala 200% */
            }
          
            /* Mengatur halaman pertama untuk dicetak */
            @page :first {
              margin: 0;
            }
          
            
          
        `}
      </style>
      <div className="date">Tanggal: 28 Oktober 2023</div>
      <h1 className="react-app">Aplikasi React Saya</h1>
      <div className={style["container"]}>
        <div className={style["nomor"]}>
          <div>Nomor</div>
          <div>:</div>
          </div>
        <div className={style["tahunAnggaran"]}>
          <div>Tahun Anggaran</div>
          <div>: {tahunAnggaran}</div>
          
          </div>
          <div className={style["judulKuitansi"]}>
KUITANSI
          </div>
          <div className={style["sudahTerima"]}>
          <div>Sudah terima dari</div>
        <div>:</div>
          <div>{sudahTerima}</div>
          </div>
          <div className={style["uangSebanyak"]}>
          <div>Uang sebanyak</div>
          <div>:</div>
          <div>{uangSebanyak}</div>
          </div>
          <div className={style["kotakanGunaMembayar"]}>
          <div className={style["gunaMembayar"]}>
          <div>Guna Membayar</div>
          <div>:</div>
          <div>{gunaMembayar}</div>
          </div>
          <div className={style["listAlat"]}>
<table className={style["tabel"]}>
    {data.map((val,index)=>(
      <tr key={index}>
        <td>-</td>
<td>{val.Jumlah} </td>
<td>{val.Satuan} </td>
<td>{val.Item} </td>
<td>@Rp.</td>
<td>{val.Harga},- </td>
<td>Rp. </td>
<td>{val.PerkalianHarga},- </td>
      </tr>
    ))}
    </table>
    <div className={style["totalHarga"]}>
      <div> JUMLAH</div>
      <div> Rp.</div>
      <div> {totalPerkalianHarga},-</div>
       </div>
          </div>
          </div>
          <div className={style["bawah"]}>
<div>Rp. {totalPerkalianHarga},-</div>
<div> Barang/Jasa sudah diterima dengan baik dan lengkap</div>
          <div> Semarang, {tglSekarang} {bulanSekarang} {tahunSekarang}</div>
          </div>
          <div className={style["namaTerang"]}>
            Prof.Dr.rer.nat.Ir. A.P.Bayuseno, M.Sc.
          </div>
      </div>
    </div>
  );
};

export default Print;
