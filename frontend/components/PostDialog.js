"use client"

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export default function PostDialog({ open, onClose, onSubmit, postData }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (postData) setFormData(postData);
  }, [postData]);

  if (!postData) return null;

  const intent = postData.intent || postData.type || "other";

  const handleChange = (fieldPath) => (e) => {
    const keys = fieldPath.split(".");
    const updated = { ...formData };
    let temp = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!temp[keys[i]]) temp[keys[i]] = {};
      temp = temp[keys[i]];
    }
    temp[keys[keys.length - 1]] = e.target.value;
    setFormData(updated);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  // Render fields depending on intent
  const renderFields = () => {
    switch (intent) {
      case "announcement":
        return (
          <>
            <TextField
              label="Department"
              fullWidth
              margin="dense"
              value={formData.department || ""}
              onChange={handleChange("department")}
              sx={inputStyle}
            />
            <TextField
              label="Message"
              fullWidth
              margin="dense"
              multiline
              minRows={2}
              value={formData.message || ""}
              onChange={handleChange("message")}
              sx={inputStyle}
            />
            <TextField
              label="Resource Link"
              fullWidth
              margin="dense"
              value={formData.resourceLink || ""}
              onChange={handleChange("resourceLink")}
              sx={inputStyle}
            />
            <Divider sx={{ my: 2, borderColor: "#333" }} />
            <Typography variant="subtitle2" sx={{ color: blue[300], mb: 1 }}>
              Editable Preview
            </Typography>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={formData.editable_preview?.title || ""}
              onChange={handleChange("editable_preview.title")}
              sx={inputStyle}
            />
            <TextField
              label="Short Description"
              fullWidth
              margin="dense"
              multiline
              minRows={2}
              value={formData.editable_preview?.short_description || ""}
              onChange={handleChange("editable_preview.short_description")}
              sx={inputStyle}
            />
          </>
        );
      case "event":
        return (
          <>
            <TextField
              label="Event Title"
              fullWidth
              margin="dense"
              value={formData.title || ""}
              onChange={handleChange("title")}
              sx={inputStyle}
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              multiline
              minRows={2}
              value={formData.description || ""}
              onChange={handleChange("description")}
              sx={inputStyle}
            />
            <TextField
              label="Date (ISO 8601)"
              fullWidth
              margin="dense"
              value={formData.date || ""}
              onChange={handleChange("date")}
              sx={inputStyle}
            />
            <TextField
              label="Location"
              fullWidth
              margin="dense"
              value={formData.location || ""}
              onChange={handleChange("location")}
              sx={inputStyle}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="dense"
              value={formData.imageUrl || ""}
              onChange={handleChange("imageUrl")}
              sx={inputStyle}
            />
            <Divider sx={{ my: 2, borderColor: "#333" }} />
            <Typography variant="subtitle2" sx={{ color: blue[300], mb: 1 }}>
              Editable Preview
            </Typography>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={formData.editable_preview?.title || ""}
              onChange={handleChange("editable_preview.title")}
              sx={inputStyle}
            />
            <TextField
              label="Short Description"
              fullWidth
              margin="dense"
              multiline
              minRows={2}
              value={formData.editable_preview?.short_description || ""}
              onChange={handleChange("editable_preview.short_description")}
              sx={inputStyle}
            />
            <TextField
              label="Date Text"
              fullWidth
              margin="dense"
              value={formData.editable_preview?.date_text || ""}
              onChange={handleChange("editable_preview.date_text")}
              sx={inputStyle}
            />
            <TextField
              label="Location Text"
              fullWidth
              margin="dense"
              value={formData.editable_preview?.location_text || ""}
              onChange={handleChange("editable_preview.location_text")}
              sx={inputStyle}
            />
          </>
        );
      case "lost_and_found":
        return (
          <>
            <TextField
              label="Type"
              fullWidth
              margin="dense"
              value={formData.type || ""}
              onChange={handleChange("type")}
              sx={inputStyle}
            />
            <TextField
              label="Item Name"
              fullWidth
              margin="dense"
              value={formData.itemName || ""}
              onChange={handleChange("itemName")}
              sx={inputStyle}
            />
            <TextField
              label="Location"
              fullWidth
              margin="dense"
              value={formData.location || ""}
              onChange={handleChange("location")}
              sx={inputStyle}
            />
            <TextField
              label="Contact Info"
              fullWidth
              margin="dense"
              value={formData.contactInfo || ""}
              onChange={handleChange("contactInfo")}
              sx={inputStyle}
            />
            <TextField
              label="Date Reported (ISO 8601)"
              fullWidth
              margin="dense"
              value={formData.dateReported || ""}
              onChange={handleChange("dateReported")}
              sx={inputStyle}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="dense"
              value={formData.imageUrl || ""}
              onChange={handleChange("imageUrl")}
              sx={inputStyle}
            />
            <Divider sx={{ my: 2, borderColor: "#333" }} />
            <Typography variant="subtitle2" sx={{ color: blue[300], mb: 1 }}>
              Editable Preview
            </Typography>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={formData.editable_preview?.title || ""}
              onChange={handleChange("editable_preview.title")}
              sx={inputStyle}
            />
            <TextField
              label="Short Description"
              fullWidth
              margin="dense"
              multiline
              minRows={2}
              value={formData.editable_preview?.short_description || ""}
              onChange={handleChange("editable_preview.short_description")}
              sx={inputStyle}
            />
          </>
        );
      case "other":
      default:
        return (
          <Typography sx={{ color: grey[400], fontStyle: "italic" }}>
            No editable fields available for this post type.
          </Typography>
        );
    }
  };

  const inputStyle = {
    input: { color: "white" },
    "& .MuiInputLabel-root": { color: "#bbb" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
    mb: 1,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: "#1e1e1e", color: "white" }}>
        Edit Post Before Submitting
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#121212" }}>{renderFields()}</DialogContent>
      <DialogActions sx={{ bgcolor: "#121212" }}>
        <Button onClick={onClose} sx={{ color: "#bbb" }}>
          Discard
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ bgcolor: "#1976d2", color: "white", "&:hover": { bgcolor: "#1565c0" } }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}