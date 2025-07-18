import { slotMachine } from "@/services/slotMachine";
import { NextResponse } from "next/server";
import { z } from "zod";

const SpinRequest = z.object({
  balance: z.number().min(0, "Balance cannot be negative"),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = SpinRequest.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.cause },
        { status: 400 }
      );
    }

    const { balance } = validation.data;

    if (balance <= 0) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    const result = slotMachine.performRoll(balance);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Slot machine error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
