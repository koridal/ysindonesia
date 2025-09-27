import { TypedObject } from "sanity";

export interface simpleProjectCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: string;
}

export interface fullProject {
  currentSlug: string;
  title: string;
  titleImage: string;
  body: TypedObject[];
}
