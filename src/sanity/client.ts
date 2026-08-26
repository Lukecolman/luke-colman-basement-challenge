import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = []
}: {
  query: string;
  params?: Record<string, string | number | boolean>;
  tags?: string[];
}) {
  if (!isSanityConfigured) return null;

  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: 60, tags }
  });
}
