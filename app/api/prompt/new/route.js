import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async ( request ) => {
  const { userID, prompt, tag } = await request.json();
  console.log(userID, prompt, tag)
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userID,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create suggestion", { status: 500 });
  }
};
