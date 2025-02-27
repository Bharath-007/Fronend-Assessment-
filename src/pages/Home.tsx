import { useState } from "react";
import TableRow from "../component/TableRow";
import { calculateParentValue, calculateVariance } from "../component/Utils";

export interface ChildNode {
  id: string;
  label: string;
  value: number;
  variance?: number;
}

export interface ParentNode {
  id: string;
  label: string;
  value?: number;
  children: ChildNode[];
  variance?: number;
}

export type TableRowProps = {
  row: ParentNode | ChildNode;
  onUpdateValue: (id: string, newValue: number) => void;
  level?: number;
};

const initialState: ParentNode[] = [
  {
    id: "electronics",
    label: "Electronics",
    children: [
      {
        id: "phones",
        label: "Phones",
        value: 800,
      },
      {
        id: "laptops",
        label: "Laptops",
        value: 700,
      },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    children: [
      {
        id: "tables",
        label: "Tables",
        value: 300,
      },
      {
        id: "chairs",
        label: "Chairs",
        value: 700,
      },
    ],
  },
].map((parent) => ({
  ...parent,
  value: calculateParentValue(parent.children),
}));

const Home = () => {
  const [data, setData] = useState<ParentNode[]>(initialState);

  const handleUpdateValue = (id: string, newValue: number) => {
    setData((prevData) =>
      prevData.map((parent) => {
        const updatedChildren = parent.children.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              value: newValue,
              variance: calculateVariance(child.value, newValue),
            };
          }
          return child;
        });

        const newParentValue = calculateParentValue(updatedChildren);
        const newVariance = calculateVariance(
          parent.value || 0,
          newParentValue
        );

        return {
          ...parent,
          children: updatedChildren,
          value: newParentValue,
          variance: newVariance,
        };
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#333" }}>
        Simple Hierarchical Table Website
      </h2>

      {/* Table Container */}
      <div style={{ width: "80%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#00476d", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Label
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Value
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Input
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Allocation %
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Allocation Val
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Variance %
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: ParentNode) => (
              <TableRow
                key={row.id}
                row={row}
                onUpdateValue={handleUpdateValue}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
