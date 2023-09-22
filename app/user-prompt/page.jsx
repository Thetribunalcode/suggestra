"use client";
import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditPrompt() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const paramsId = searchParams.get("id");
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });


  useEffect(() => {
    const getCurrentPost = async () => {
      const res = await fetch(`/api/prompt/${paramsId}`);
      const data = await res.json();
      console.log(data)
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (paramsId) { getCurrentPost(); }
  }, []);


    console.log(post);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!paramsId) alert("No prompt ID");

    try {
      const res = await fetch(`/api/prompt/${paramsId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
}
