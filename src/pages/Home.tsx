import TableRow from "../component/TableRow";
import { ParentNode, useHierarchyTable } from "../component/useHierarchyTable";

const Home = () => {
  const { data, handleUpdateValue } = useHierarchyTable();

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
            border: "1px solid #cecece",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ border: "1px solid red" }}>
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
