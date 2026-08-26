import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
};

export type Category = {
  title: string;
  slug: string;
  description?: string;
};

export type Author = {
  name: string;
  slug: string;
  avatar?: SanityImage;
  bio?: string;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  featuredImage?: SanityImage;
  category?: Category;
  author?: Pick<Author, "name" | "slug">;
};

export type Post = PostSummary & {
  updatedAt?: string;
  body?: PortableTextBlock[];
  categories?: Category[];
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
};
