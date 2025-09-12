"use client"
// App.js
import React, { useState } from "react";
import { CssBaseline, Container, Typography } from "@mui/material";
import ChatBox from "@/components/ChatBox";
import PostDialog from "@/components/PostDialog";


export default function App() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleSendPrompt = async (prompt) => {
    // Call your API here; mock response for now
    const response = {
      intent: "lost_and_found",
      confidence: 0.92,
      payload: {
        type: "lost_and_found",
        itemName: "black leather wallet",
        location: "central library",
        imageUrl: null,
        contactInfo: "+91-98765-43210 | john.doe@example.edu",
        dateReported: "2025-09-12T00:00:00Z",
        editable_preview: {
          title: "Lost: black leather wallet",
          short_description:
            "Lost near central library; contains ID and student cards; contact info provided.",
        },
      },
    };

    // Open dialog with API payload
    setCurrentPost(response.payload);
    setDialogOpen(true);
  };

  const handleSubmitPost = (postData) => {
    // Add the post to feed
    setFeedPosts([postData, ...feedPosts]);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
          Social Feed
        </Typography>

        <ChatBox onSend={handleSendPrompt} />

        {feedPosts.map((post, index) => (
          <PostCard key={index} type="lostfound" data={post} />
        ))}

        <PostDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleSubmitPost}
          postData={currentPost}
        />
      </Container>
    </>
  );
}