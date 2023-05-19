/*
Kareler Talimaları

Aşağıdaki kısa videoyu izleyin:
https://www.ergineer.com/assets/materials/a664dfe7-kareler.gif

Bu bileşen, bir yandan "kare idlerinin" listesinin kaydını tutar,
ve şu anda aktif olan id yi tutar. Yani iki dilim kullanılacak!
Biri kareleri oluşturmak için kullanılır, diğeri ise id yi tutmak için,
böylece bileşen hangi karenin o anda aktif olduğunu bilir.

Herhangi bir noktada yalnızca bir kare aktif olabilir (ya da hiçbiri)

Aşaıdaki yorumları takip edin.
*/
import React from "react";
import { useState } from "react";

//Bu değişkeni YALNIZCA bir durum dilimini yüklemek için kullanın!
const KareIdListesi = ["sqA", "sqB", "sqC", "sqD"];

export default function Kareler() {
  // State hookunu 2 defa kullanın: 'kareler' ve
  // 'aktifKare' olmak üzere. Birisi kare idlerini _dizi_ olarak tutacak, diğeri ise aktif olan
  // kareyi gözlemleyecek. Sayfa yüklendiğinde aktif kare olmayacak,
  // yani  'aktifKare' null olmalı.
  const [kareler, setKareler] = useState(["sqA", "sqB", "sqC", "sqD"]);
  const [aktifKare, setAktifKare] = useState(null);

  const ClassAdiAl = (id) => {
    // Bu bir click handler değildir, JSX içinde kullanılan bir yardımcıdır(helper).(aşağıya bakın)
    // Eğer argüman olarak verilen id aktif kare state'indeki id ile eşleşirse, class adı 'active' olan bir string döndürecek
    // diğer durumlar için boş döndürecek.
    // Etkisini görmek için kareye sağ tıklayın ve "öğeyi inceleyin".
    return aktifKare == id ? "active" : ""; //
  };

  const AktifEt = (id) => {
    // Bu bir _satır içinden çağırılmış_ click handler yardımcısıdır.
    // id bağımsız değişkenini, stateteki aktif id olacak şekilde ayarlayın
    // eğer zaten aktifse, o zaman önce state i resetlemeliyiz.
    //setAktifKare(id === aktifKare ? null : id);

    setAktifKare((prevAktifKare) => {
      return prevAktifKare === id ? null : id;
    });
  };

  const yeniKareEkle = () => {
    // Yeni bir kare eklemek için, mevcut kareler dizisini kopyalayın ve yeni kareyi ekleyin.
    setKareler((prevKareler) => {
      const yeniKareler = [...prevKareler, `sq${prevKareler.length + 1}`];
      return yeniKareler;
    });
  };

  const kareSil = () => {
    // Aktif kareyi silmek için, mevcut kareler dizisini kopyalayın ve aktif kareyi hariç tutun.
    setKareler((prevKareler) => {
      const yeniKareler = prevKareler.filter((id) => id !== aktifKare);
      return yeniKareler;
    });
    setAktifKare(null); // Aktif kareyi null olarak sıfırlayın.
  };

  return (
    <div className="widget-squares container">
      <h2>Kareler</h2>
      <div className="squares">
        {kareler.map((id) => (
          <div
            id={id}
            key={id}
            className={`square ${ClassAdiAl(id)}`}
            onClick={() => AktifEt(id)}
          ></div>
        ))}
      </div>
      <button onClick={yeniKareEkle}>Yeni Kare Ekle</button>
      <button onClick={kareSil}>Aktif Kareyi Sil</button>
    </div>
  );
}