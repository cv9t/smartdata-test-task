import { Box, Typography } from "@mui/material";
import { ChildrenType } from "../types";

interface PageContainerProps {
  children: ChildrenType;
  title?: string;
}

function PageContainer({
  title,
  children,
}: PageContainerProps): JSX.Element | null {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "63.75rem",
        width: "100%",
        mx: "auto",
        py: 3,
      }}
    >
      {title && (
        <Typography variant="h4" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      <div>{children}</div>
    </Box>
  );
}

export default PageContainer;
