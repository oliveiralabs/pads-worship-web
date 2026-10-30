import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest { return { name: "Pads Worship", short_name: "Pads Worship", description: "Ambient pads for worship and live music.", start_url: "/", display: "standalone", background_color: "#06142f", theme_color: "#0b54e8", icons: [{ src: "/brand/pads-worship-icon.png", sizes: "512x512", type: "image/png" }] }; }
