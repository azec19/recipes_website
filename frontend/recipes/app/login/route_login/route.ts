import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const backendRes = await fetch("http://backend:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await backendRes.json();

    const response = NextResponse.json(data, {
        status: backendRes.status
    });

    // 🔥 Transfert des cookies du backend vers le client
    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }

    return response;
}
