import { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "./components/DataTable";

export default function ExcelUploader() {
  const [data, setData] = useState([]);
  const [imagePaths, setImagePaths] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target) {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          setData(data);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const sendDataToBackend = async () => {
    if (data.length === 0) {
      alert("No hay datos cargados para enviar.");
      return;
    }

    const dataWithImagePaths = data.map((row, index) => {
      const filepath = imagePaths[index];
      return { ...row, filepath };
    });

    try {
      const response = await fetch("http://localhost:3000/automate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithImagePaths),
      });

      if (response.ok) {
        alert("Los formularios fueron rellenados con exito.");
      } else {
        alert("Hubo un problema al enviar los datos. Revisa la consola para más detalles.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos. Revisa la consola para más detalles.");
    }
  };

  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ marginRight: "16px" }}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{
              display: "block",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button onClick={sendDataToBackend}>Fill Form</button>
      </div>
      {data.length > 0 && <DataTable data={data} setImagePaths={setImagePaths} imagePaths={imagePaths} />}
    </div>
  );
}
