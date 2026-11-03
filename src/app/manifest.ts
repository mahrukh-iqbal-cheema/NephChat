import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NephChat",
    short_name: "NephChat",
    description: "Your simple guide to kidney health.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#1b4b43",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
