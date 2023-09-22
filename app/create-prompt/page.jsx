'use client';
import Form from "@components/Form"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"


export default function CreatePrompt() {
    const { data: session } = useSession()
    const router = useRouter()
    const [submitting, setsubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    const createPrompt = async (e) => {

        e.preventDefault();
        setsubmitting(true)
        
        try {
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userID: session?.user.id,
                    tag: post.tag,
                }),
            })
            
            console.log(res)
            if (res.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setsubmitting(false)
        }
    }
  return (
      <div>
          <Form 
              type="Create"
              post={post}
              setPost={setPost}
              submitting={submitting}
              handleSubmit={createPrompt}
          />
    </div>
  )
}
