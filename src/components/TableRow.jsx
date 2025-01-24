import { validValues } from "../utils/const";

// eslint-disable-next-line react/prop-types
export default function TableRow({ row, columns, imagePath, setImagePaths, rowIndex, missingColumns }) {

    const validateValue = (column, value) => {
      if (validValues[column]) {
        return validValues[column].includes(value);
      }
      return true;
    };
  
    const handleImagePath = (index, e) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileName = file.name;
        setImagePaths((prev) => ({ ...prev, [index]: "assets/" + fileName }));
      }
    };
  
    return (
      <tr>
        {columns.map((column) => (
          <td
            key={column}
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor:
                (!validateValue(column, row[column]) || missingColumns.includes(column))
                  ? "#ff1919"
                  : "transparent",
            }}
          >
            {row[column] !== undefined ? row[column] : "N/A"}
          </td>
        ))}
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
          {imagePath ? (
            <img
              src={imagePath || "/placeholder.svg"}
              alt="Uploaded"
              style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "4px" }}
            />
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImagePath(rowIndex, e)}
                style={{
                  display: "block",
                  padding: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </td>
      </tr>
    );
  }
  