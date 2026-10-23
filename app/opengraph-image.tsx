import { ImageResponse } from "next/og";
import { MARK, MARK_VIEWBOX, WORDMARK_BYTE, WORDMARK_EVO, WORDMARK_VIEWBOX } from "@/components/brand/paths";

export const alt = "EvoByte: Humble code. Powerful workflows.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0e3051";
const HONEY = "#e3bd5c";

/* Social card: navy field, white/honey wordmark, the EB mark cropped at the right edge. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, position: "relative" }}>
        <svg viewBox={WORDMARK_VIEWBOX} width={560} height={83} style={{ position: "absolute", left: 80, top: 250 }}>
          {WORDMARK_EVO.map((d) => <path key={d} d={d} fill="#ffffff" fillRule="evenodd" />)}
          {WORDMARK_BYTE.map((d) => <path key={d} d={d} fill={HONEY} />)}
        </svg>
        <svg viewBox={MARK_VIEWBOX} width={620} height={339} style={{ position: "absolute", right: -150, top: 145 }}>
          <path d={MARK.e1 + MARK.e2 + MARK.e3} fill="#ffffff" fillOpacity={0.12} />
          <path d={MARK.bStem + MARK.bBowl} fill={HONEY} fillOpacity={0.9} />
        </svg>
        <div style={{ position: "absolute", left: 80, top: 370, width: 300, height: 10, background: HONEY }} />
      </div>
    ),
    size,
  );
}
