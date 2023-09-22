import React from "react";
import Link from "next/link";

import { useTheme } from "next-themes";
export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) {

  const { theme, setTheme } = useTheme();
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className={ theme=='light' ? `blue_gradient` : 'orange_gradient'}>{type} Post</span>
      </h1>
      <p className='desc dark:text-gray-50 text-left max-w-md '>
        {type} and discover suggestions about video ideas for your Youtube
        channel in a particular genre.{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi dark:text-teal-50 font-semibold text-base text-gray-700'>
            Your Idea
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi dark:text-gray-50 font-semibold text-base text-gray-700'>
            Field of Idea{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link
            href='/'
            className='dark:text-gray-200 text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
