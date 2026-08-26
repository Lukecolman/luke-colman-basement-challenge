import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import type { SanityImage } from "@/types/blog";

const builder = imageUrlBuilder(client);

export function urlForImage(source?: SanityImage) {
  if (!source?.asset?._ref) return null;
  return builder.image(source);
}
