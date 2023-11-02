/*import React, { useEffect } from "react";
import style from "./style.module.css";
import LogoPlus from "../Gambar/tambah.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import terbilang from 'terbilang';

const Home = () => {
  const [penyetor, setPenyetor] = useState("");
  const [nominal, setNominal] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [item, setItem] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [satuan, setSatuan] = useState("");
  const [harga, setHarga] = useState("");
  const [listData, setListData] = useState([]);
  const [totalHargaDiListView, setTotalHargaDiListView] = useState("");
  const [perkalianHarga, setPerkalianHarga] = useState("");
  const [keteranganTidakLengkap, setKeteranganTidakLengkap] = useState("");
  const navigate = useNavigate();

  // fungsi onchange input
  const ChangeValue = (val, id) => {
    switch (id) {
      case "penyetor":
        setPenyetor(val);
        localStorage.setItem(id, val);
        break;
      case "nominal":
        setNominal(val);
        localStorage.setItem(id, val);
        break;
      case "keperluan":
        setKeperluan(val);
        localStorage.setItem(id, val);
        break;
      case "item":
        setItem(val);
        localStorage.setItem(id, val);
        break;
      case "jumlah":
        setJumlah(val);
        localStorage.setItem(id, val);
        break;
      case "satuan":
        setSatuan(val);
        localStorage.setItem(id, val);
        break;
      case "harga":
        setHarga(val);
        localStorage.setItem(id, val);
        break;
      default:
        break;
    }
  };
  // klik tanda plus tambah
  const Tambah = () => {
    let entry;
    let existingEntries = JSON.parse(localStorage.getItem("tambah"));
    if (existingEntries == null) existingEntries = [];
    entry = {
      Item: localStorage.getItem("item"),
      Jumlah: localStorage.getItem("jumlah"),
      Satuan: localStorage.getItem("satuan"),
      Harga: localStorage.getItem("harga"),
      PerkalianHarga:
        parseInt(localStorage.getItem("harga")) *
        parseInt(localStorage.getItem("jumlah")),
    };
    existingEntries.push(entry);
    localStorage.setItem("tambah", JSON.stringify(existingEntries));
    
    setListData(JSON.parse(localStorage.getItem("tambah")));
    let containerTotalHarga = [];
    containerTotalHarga = JSON.parse(localStorage.getItem("tambah"));

    let hitunganTotalHarga = 0;
    for (let i = 0; i < containerTotalHarga.length; i++) {
      hitunganTotalHarga =
        hitunganTotalHarga + parseInt(containerTotalHarga[i].PerkalianHarga);
    }
    setTotalHargaDiListView(hitunganTotalHarga);
    localStorage.setItem("TotalHargaDiListView",hitunganTotalHarga);
  };
  // Klik button generate
  const Generate = () => {
    let convertNominal = parseInt(localStorage.getItem("nominal"));
    const nominalText = convertToWords(convertNominal);
localStorage.setItem("convertNominal",nominalText + " rupiah");
    navigate("/Print");
  };
  // klik button delete di tabel listview
  const Delete =(index)=>{
    listData.splice(index,1);
    localStorage.setItem("tambah", JSON.stringify(listData));
    setListData(JSON.parse(localStorage.getItem("tambah")));
    let containerTotalHarga = [];
    containerTotalHarga = JSON.parse(localStorage.getItem("tambah"));

    let hitunganTotalHarga = 0;
    for (let i = 0; i < containerTotalHarga.length; i++) {
      hitunganTotalHarga =
        hitunganTotalHarga + parseInt(containerTotalHarga[i].PerkalianHarga);
    }
    setTotalHargaDiListView(hitunganTotalHarga);
  }
  
// Konversi nominal angka rupiah ke huruf menggunakan library terbilang
function convertToWords(nominal) {
  
  if (nominal === 1000) {
    return 'seribu';
  } else {
    return terbilang(nominal, { output: 'text' });
  }
}


  

  return (
    <div className={style["bigContainer"]}>
      <div className={style["container"]}>
        <div className={style["judul"]}>
          <div>KuitansiKu</div>
        </div>
        <div className={style["wadahIsi"]}>
          <div className={style["penyetor"]}>
            <input
              type="text"
              value={penyetor}
              onChange={(e) => ChangeValue(e.target.value, "penyetor")}
            />
            <div>Penyetor</div>
          </div>
          <div className={style["nominal"]}>
            <input
              type="number"
              value={nominal}
              onChange={(e) => ChangeValue(e.target.value, "nominal")}
            />
            <div>Nominal</div>
          </div>
          <div className={style["keperluan"]}>
            <textarea
              type="text"
              value={keperluan}
              onChange={(e) => ChangeValue(e.target.value, "keperluan")}>
            </textarea>
            <div>Keperluan</div>
          </div>
          <div className={style["wadahMilihBelanja"]}>
            <div className={style["wadahMilihBelanjaKiri"]}>
              <div className={style["item"]}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => ChangeValue(e.target.value, "item")}
                />
                <div>Item</div>
              </div>
              <div className={style["wadahQuantity"]}>
                <div className={style["jumlah"]}>
                  <input
                    type="number"
                    value={jumlah}
                    onChange={(e) => ChangeValue(e.target.value, "jumlah")}
                  />
                  <div>Jumlah </div>
                </div>
                <div className={style["satuan"]}>
                  <input
                    type="text"
                    value={satuan}
                    onChange={(e) => ChangeValue(e.target.value, "satuan")}
                  />
                  <div>Satuan </div>
                </div>
                <div className={style["harga"]}>
                  <input
                    type="number"
                    value={harga}
                    onChange={(e) => ChangeValue(e.target.value, "harga")}
                  />
                  <div>Harga </div>
                </div>
              </div>
            </div>
            <div className={style["wadahMilihBelanjaKanan"]}>
              <img onClick={Tambah} src={LogoPlus} alt="Logo Tambah" />
            </div>
          </div>
          <div className={style["keteranganTidakLengkap"]}>
            {keteranganTidakLengkap}
          </div>
          <div className={style["listView"]}>
            <table className={style["tabel"]}>
              <tr>
                <th>Item</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Harga</th>
                <th>Jumlah Harga </th>
                <th>action</th>
              </tr>
              {listData.map((val, index) => (
                <tr key={index}>
                  <td>{val.Item}</td>
                  <td>{val.Jumlah}</td>
                  <td>{val.Satuan}</td>
                  <td>{val.Harga}</td>
                  <td>{val.PerkalianHarga}</td>
                  <td className={style["delete"]} onClick={()=>Delete(index)}>Delete</td>
                </tr>
              ))}
            </table>
          </div>
          <div className={style["totalHargaListView"]}>
            <div>Total</div>
            <div>{totalHargaDiListView}</div>
          </div>
          <div className={style["generate"]}>
            <button onClick={Generate}>Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
*/
import React from "react";
import addNotification from "react-push-notification";

const App=()=>{
  const Notify=()=>{
    addNotification({
      title:"test push notif",
      message:"hai, berhasil kan",
      duration:4000,
      native:true,
    })
  }
return(
  <div>
    <button onClick={Notify}>Notify</button>
  </div>
)
}
export default App;