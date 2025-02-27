import { useState, useCallback } from "react";
import { calculateParentValue, calculateVariance } from "../component/Utils";

export interface ChildNode {
  id: string;
  label: string;
  value: number;
  variance?: number;
  children?: ChildNode[];
}

export interface ParentNode {
  id: string;
  label: string;
  value: number;
  children: ChildNode[];
  variance?: number;
}

const initialState: ParentNode[] = [
  {
    id: "electronics",
    label: "Electronics",
    children: [
      { id: "phones", label: "Phones", value: 800 },
      { id: "laptops", label: "Laptops", value: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    children: [
      { id: "tables", label: "Tables", value: 300 },
      { id: "chairs", label: "Chairs", value: 700 },
    ],
  },
].map((parent) => ({
  ...parent,
  value: calculateParentValue(parent.children),
}));

export const useHierarchyTable = () => {
  const [data, setData] = useState<ParentNode[]>(initialState);

  const handleUpdateValue = useCallback(
    (id: string, newValue: number, isParent = false) => {
      setData((prevData) =>
        prevData.map((parent) => {
          if (isParent) {
            if (parent.id === id) {
              const newParentVariance = calculateVariance(
                parent.value,
                newValue
              );
              const updatedChildren = parent.children.map((child) => {
                const proportion = child.value / parent.value;
                const newChildValue = proportion * newValue;
                return {
                  ...child,
                  value: Number(newChildValue.toFixed(2)),
                  variance: Number(
                    calculateVariance(
                      child.value,
                      Number(newChildValue.toFixed(2))
                    ).toFixed(4)
                  ),
                };
              });

              return {
                ...parent,
                value: newValue,
                variance: Number(newParentVariance.toFixed(2)),
                children: updatedChildren,
              };
            }
            return parent;
          } else {
            const updatedChildren = parent.children.map((child) =>
              child.id === id
                ? {
                    ...child,
                    value: newValue,
                    variance: calculateVariance(child.value, newValue),
                  }
                : child
            );

            const newParentValue = updatedChildren.reduce(
              (acc, child) => acc + child.value,
              0
            );
            const newVariance = calculateVariance(parent.value, newParentValue);

            return {
              ...parent,
              children: updatedChildren,
              value: newParentValue,
              variance:
                parent.value === newParentValue
                  ? parent.variance
                  : Number(newVariance.toFixed(2)),
            };
          }
        })
      );
    },
    []
  );

  return { data, handleUpdateValue };
};
