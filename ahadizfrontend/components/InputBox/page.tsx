import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

interface InputBoxProps {
  icon: SvgIconComponent;
  label: string;
  type?: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputBox({
  icon: IconComponent,
  label,
  type = "text",
  required = false,
  name,
  value,
  onChange,
}: InputBoxProps) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <IconComponent
          sx={{
            color: "#967939",
            mr: 1,
            my: 0.5,
          }}
        />
        <TextField
          id={`input-${name}`}
          value={value}
          name={name}
          label={label}
          variant="standard"
          type={type}
          required={required}
          onChange={onChange}
          sx={{ width: "300px" }}
        />
      </Box>
    </Box>
  );
}

export default InputBox;
