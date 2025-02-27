import { ChildNode } from "./useHierarchyTable";

export const calculateVariance = (
  originalValue: number,
  newValue: number
): number => {
  if (originalValue === 0) return 0;
  return ((newValue - originalValue) / originalValue) * 100;
};

export const calculateParentValue = (children: ChildNode[]): number => {
  return children.reduce((sum, child) => sum + (child.value || 0), 0);
};
