import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req) {

    const { message, model, parentModel } = await req.json();

    /* Send POST request using Axios */
    const response = await axios.post(
        "https://kravixstudio.com/api/v1/chat",
        {
            message: message,
            aiModel: model,
            outputType: "text"
        },
        {
            headers: {
                "Content-Type": "application/json",     // Tell server we're sending JSON
                "Authorization": "Bearer " + process.env.KRAVISSTUDIO_API_KEY  // Replace with your API key
            }
        }
    );

    console.log(response.data);
    return NextResponse.json({
        ...response.data,
        model: parentModel
    })
}