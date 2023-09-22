"use client";
import React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
export default function UProfile() {
  const { data: session } = useSession();

  const [post, setpost] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/user-prompt?id=${post._id}`);
  };

  const handleDelete = async (p) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      await fetch(`/api/prompt/${p._id.toString()}`, {
        method: "DELETE",
      });
      const filteredPosts = post.filter((myp) => myp._id !== p._id);
      setpost(filteredPosts);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      console.log(session?.user.id)
      const data = await res.json();
      console.log("This is user data", data);
      setpost(data);
    };
    if (session?.user.id) getPosts();
  }, []);
  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Here you can see all your posts and edit your profile.'
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
