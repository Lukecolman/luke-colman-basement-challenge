import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostDetailRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/blog/${slug}`);
}
