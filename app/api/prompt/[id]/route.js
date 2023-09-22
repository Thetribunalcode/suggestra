// GET (read)
import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request, {params}) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response( "Prompt not found", { status: 404 } );
        return new Response(JSON.stringify(prompt), { status: 200 }); 
    }
    catch (error) {
        console.log(error);
        return new Response( "Failed to get prompts", { status: 500 } );
    }
}

// PUT {update}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDatabase();
        const { prompt, tag } = await request.json()
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response("Successfully updated the Prompts", { status: 200 });
    }
    catch (error) {
        console.log("Patch error", error);
        return new Response("Failed to update prompt", { status: 500 });
    }
}


// DELETE delete


export const DELETE = async(request, { params }) => {
    try { 
        await connectToDatabase();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted", { status: 200 });
    }
    catch (error)
    {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}