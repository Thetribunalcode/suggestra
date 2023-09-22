import PromptCard from "./PromptCard";

import { useTheme } from "next-themes";
const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  handleProfileClick,
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span
          className={theme == "light" ? `blue_gradient` : "orange_gradient"}>
          {name} Profile
        </span>
      </h1>
      <p className=' dark:text-gray-100 desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        { data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))
         }
      </div>
    </section>
  );
};

export default Profile;
