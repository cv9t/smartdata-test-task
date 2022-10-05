import { useState, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import List, { ListProps } from "./List";
import { Box, Pagination } from "@mui/material";

interface PaginationListProps<T> extends ListProps<T> {
  onPageChange: (page: number) => void;
  numberOfPages: number;
}

function PaginationList<T>({
  onPageChange,
  numberOfPages,
  ...rest
}: PaginationListProps<T>): JSX.Element | null {
  const [page, setPage] = useState(1);

  const handleChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <List {...rest} />
      {numberOfPages > 1 && (
        <Pagination
          page={page}
          onChange={handleChange}
          count={numberOfPages}
          color="primary"
        />
      )}
    </Box>
  );
}

export default observer(PaginationList);
