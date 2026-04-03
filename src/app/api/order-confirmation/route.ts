import { NextRequest, NextResponse } from "next/server";
import { formatINR } from "@/lib/currency";

type OrderItem = {
    name: string;
    variantName: string;
    quantity: number;
    lineTotal: number;
};

function buildOrderEmailHtml(params: {
    firstName: string;
    lastName: string;
    orderId: string;
    items: OrderItem[];
    subtotal: number;
    taxes: number;
    total: number;
    origin: string;
}): string {
    const { firstName, lastName, orderId, items, subtotal, taxes, total, origin } = params;
    const rows = items
        .map(
            (item) => `
<tr>
  <td style="padding:12px;border-bottom:1px solid #eee;">
    <strong>${escapeHtml(item.name)}</strong><br/>
    <span style="color:#666;font-size:13px;">Color: ${escapeHtml(item.variantName)} · Qty: ${item.quantity}</span>
  </td>
  <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;">${formatINR(item.lineTotal)}</td>
</tr>`
        )
        .join("");

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <div style="background:#0a0a0a;padding:40px;text-align:center;">
    <h1 style="color:white;font-size:24px;letter-spacing:0.15em;margin:0;">VISIONCRAFT</h1>
    <p style="color:rgba(255,255,255,0.5);margin-top:8px;font-size:13px;letter-spacing:0.1em;">EYEWEAR</p>
  </div>
  <div style="padding:40px;">
    <div style="text-align:center;margin-bottom:30px;">
      <h2 style="margin:0;font-size:22px;color:#1a1a1a;">Order confirmed</h2>
      <p style="color:#666;margin-top:8px;">Thank you, ${escapeHtml(firstName)}.</p>
    </div>
    <div style="background:#f8f9fa;border-radius:8px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#666;padding:4px 0;">Order</td><td style="text-align:right;font-weight:700;">#${escapeHtml(orderId)}</td></tr>
        <tr><td style="color:#666;padding:4px 0;">Date</td><td style="text-align:right;">${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</td></tr>
        <tr><td style="color:#666;padding:4px 0;">Customer</td><td style="text-align:right;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
      </table>
    </div>
    <h3 style="font-size:16px;margin-bottom:12px;color:#1a1a1a;">Items</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <thead><tr><th style="text-align:left;padding:12px;border-bottom:2px solid #eee;color:#666;font-size:13px;">ITEM</th>
      <th style="text-align:right;padding:12px;border-bottom:2px solid #eee;color:#666;font-size:13px;">PRICE</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
      <tr><td style="padding:6px 0;color:#666;">Subtotal</td><td style="text-align:right;">${formatINR(subtotal)}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Shipping</td><td style="text-align:right;color:#2e7d32;font-weight:600;">FREE</td></tr>
      <tr><td style="padding:6px 0;color:#666;">GST (est.)</td><td style="text-align:right;">${formatINR(taxes)}</td></tr>
      <tr><td style="padding:12px 0;font-weight:700;font-size:18px;border-top:2px solid #eee;">Total</td><td style="text-align:right;font-weight:700;font-size:18px;border-top:2px solid #eee;">${formatINR(total)}</td></tr>
    </table>
    <div style="text-align:center;">
      <a href="${origin}/shop" style="display:inline-block;background:#0a0a0a;color:white;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;letter-spacing:0.05em;">Continue shopping</a>
    </div>
  </div>
  <div style="background:#f8f9fa;padding:24px;text-align:center;font-size:12px;color:#999;">
    <p style="margin:0;">VisionCraft — All prices in Indian Rupees (INR)</p>
    <p style="margin:4px 0 0;">This is an automated message. Please do not reply.</p>
  </div>
</div>
</body></html>`;
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
    let body: {
        email?: string;
        firstName?: string;
        lastName?: string;
        orderId?: string;
        items?: OrderItem[];
        subtotal?: number;
        taxes?: number;
        total?: number;
        /** Client origin for links in the email (e.g. https://localhost:3000). */
        siteUrl?: string;
    };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const email = body.email?.trim();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const orderId = body.orderId?.trim();
    const items = body.items;
    const subtotal = body.subtotal;
    const taxes = body.taxes;
    const total = body.total;

    if (!email || !firstName || !lastName || !orderId || !items || subtotal == null || taxes == null || total == null) {
        return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const rawOrigin =
        body.siteUrl?.trim() ||
        req.headers.get("origin") ||
        (req.headers.get("referer") ? new URL(req.headers.get("referer")!).origin : null) ||
        "http://localhost:3000";
    let siteOrigin = "http://localhost:3000";
    try {
        siteOrigin = new URL(rawOrigin).origin;
    } catch {
        siteOrigin = "http://localhost:3000";
    }
    const html = buildOrderEmailHtml({
        firstName,
        lastName,
        orderId,
        items,
        subtotal,
        taxes,
        total,
        origin: siteOrigin,
    });

    const key = process.env.RESEND_API_KEY;
    if (!key) {
        console.info("[order-confirmation] RESEND_API_KEY not set — demo mode, no email sent", { email, orderId });
        return NextResponse.json({ ok: true, demo: true });
    }

    const from = process.env.ORDER_FROM_EMAIL || "VisionCraft <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: email,
            subject: `VisionCraft — Order confirmed #${orderId}`,
            html,
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("[order-confirmation] Resend error", res.status, errText);
        return NextResponse.json({ ok: false, error: "Email delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
