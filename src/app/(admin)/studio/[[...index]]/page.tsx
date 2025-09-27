import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import { viewport as studioViewport } from "next-sanity/studio";
import Studio from "./Studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Loading Studio...",
};

// viewport는 타입을 지정하지 않고 그대로 객체로 선언
const viewport = {
  ...studioViewport,
  interactiveWidget: "resizes-content",
};

export { viewport }; // 또는 export const viewport = viewport;

export default function StudioPage() {
  return (
    <div>
      <Studio />
    </div>
  );
}
