"use client"

import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Type your prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          flex: 1,
          bgcolor: "#1e1e1e",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
        }}
      />
      <IconButton
        onClick={handleSend}
        sx={{ ml: 1, bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" }, color: "white" }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}