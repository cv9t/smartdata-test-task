import { Box, CircularProgress, styled } from "@mui/material";
import { ChildrenType } from "../types";

const LoaderWrapper = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

interface LoadingProps {
  loading: boolean;
  children: ChildrenType;
  cover?: boolean;
}

function Loading({
  loading,
  children,
  cover,
}: LoadingProps): JSX.Element | null {
  if (cover) {
    return (
      <Box sx={{ position: "relative" }}>
        {loading && (
          <LoaderWrapper>
            <CircularProgress />
          </LoaderWrapper>
        )}
        {children}
      </Box>
    );
  }

  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        children
      )}
    </>
  );
}

export default Loading;
