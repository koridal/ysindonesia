// app/lib/interface.ts
import { TypedObject } from "sanity";
import type { MyImageSource } from "@/lib/sanity.image";

export type simpleProjectCard = {
  title: string;
  smallDescription?: string;
  currentSlug: string;
  titleImage: MyImageSource;
};

export interface fullProject {
  currentSlug: string;
  title: string;
  titleImage: string;
  body: TypedObject[];
}
