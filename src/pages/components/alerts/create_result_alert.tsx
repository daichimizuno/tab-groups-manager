import { Alert, Box } from "@mui/material";
import React from "react";

type Props = {
  success: boolean;
  description: string;
};

const CreateResultAlert = ({ success, description }: Props) => {
  return (
    <>
      {success ? (
        <Box mt={2}>
          <Alert variant="filled" severity="success">
            {description}
          </Alert>
        </Box>
      ) : (
        <Box mt={2}>
          <Alert variant="filled" severity="error">
            {description}
          </Alert>
        </Box>
      )}
    </>
  );
};

export default CreateResultAlert;
