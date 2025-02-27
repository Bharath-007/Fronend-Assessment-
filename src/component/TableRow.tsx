import { useState } from "react";
import { ChildNode, ParentNode, TableRowProps } from "../pages/Home";

const TableRow: React.FC<TableRowProps> = ({
  row,
  onUpdateValue,
  level = 0,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const originalValue = row.value || 0;

  const handlePercentageUpdate = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const newValue = originalValue + (originalValue * percentage) / 100;
      onUpdateValue(row.id, Math.round(newValue));
    }
  };

  const handleAllocationValueUpdate = () => {};

  return (
    <>
      <tr style={{ borderBottom: "1px solid #ddd", height: "40px" }}>
        <td style={{ paddingLeft: `${level * 20}px`, fontWeight: "bold" }}>
          {row.label}
        </td>
        <td style={{ textAlign: "center", padding: "8px" }}>{row.value}</td>
        <td style={{ textAlign: "center", padding: "8px" }}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "60px",
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              textAlign: "right",
            }}
          />
        </td>
        <td style={{ textAlign: "center", padding: "8px" }}>
          <button
            onClick={handlePercentageUpdate}
            style={{
              padding: "6px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            %
          </button>
        </td>
        <td style={{ textAlign: "center", padding: "8px" }}>
          <button
            onClick={handleAllocationValueUpdate}
            style={{
              padding: "6px 10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Val
          </button>
        </td>
        <td style={{ textAlign: "center", padding: "8px", fontWeight: "bold" }}>
          {row.variance?.toFixed(2) ?? "0.00"}%
        </td>
      </tr>
      {(row as ParentNode).children &&
        (row as ParentNode)?.children?.map((child: ChildNode) => (
          <TableRow
            key={child.id}
            row={child}
            onUpdateValue={onUpdateValue}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default TableRow;
