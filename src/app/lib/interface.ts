import { TypedObject } from "sanity";
import type { MyImageSource } from "@/lib/sanity.image";

export type simpleProjectCard = {
  title: string;
  smallDescription?: string;
  currentSlug: string;
  titleImage: MyImageSource; // ← unknown에서 MyImageSource로 변경
};

export interface fullProject {
  currentSlug: string;
  title: string;
  titleImage: string;
  body: TypedObject[];
}



