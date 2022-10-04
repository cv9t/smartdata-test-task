import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number, array: T[]) => JSX.Element | null;
  gap?: number | CSSProperties["gap"];
  emptyList?: JSX.Element | null;
}

function List<T>({
  items,
  renderItem,
  gap = 3,
  emptyList,
}: ListProps<T>): JSX.Element | null {
  return (
    <>
      {items.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap }}>
          {items.map(renderItem)}
        </Box>
      )}
      {items.length === 0 && emptyList && emptyList}
    </>
  );
}

export default observer(List);
