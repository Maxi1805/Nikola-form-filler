import { requiredColumns } from "../utils/const";
import TableRow from "./TableRow";

export default function DataTable({ data, setImagePaths, imagePaths }) {
  const missingColumns = requiredColumns.filter(
    (col) => data.length > 0 && !Object.keys(data[0]).includes(col)
  );

  if (data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div>
      {missingColumns.length > 0 && (
        <div style={{ color: "red", marginBottom: "8px" }}>
          <strong>Error:</strong> Faltan las siguientes columnas requeridas: {missingColumns.join(", ")}.
        </div>
      )}
      <div style={{ color: "red", marginBottom: "8px" }}>
        <strong>Nota:</strong> Las celdas en rojo tienen valores que no son válidos.
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {column}
              </th>
            ))}
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
              imagePath={imagePaths[index]}
              setImagePaths={setImagePaths}
              rowIndex={index}
              missingColumns={missingColumns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
