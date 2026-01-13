import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = process.env.LOGTAIL_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "Logtail Token não configurado" }, { status: 500 });
    }

    // Repassa o log para o Logtail
    const response = await fetch("https://in.logtail.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        source: "frontend-proxy", // Identifica que veio via API Proxy
        server_timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao comunicar com Logtail");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no Proxy de Log:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
