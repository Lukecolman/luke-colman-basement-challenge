import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";
import type { PostSummary } from "@/types/blog";

type BlogCardProps = {
  post: PostSummary;
  priority?: boolean;
  ctaLabel?: string;
  dateFallback?: string;
  showImage?: boolean;
};

export function BlogCard({
  post,
  priority = false,
  ctaLabel = "READ MORE",
  dateFallback = "Basement",
  showImage = true
}: BlogCardProps) {
  const imageUrl = urlForImage(post.featuredImage)?.width(900).height(320).auto("format").url();
  const categoryTitle = post.category?.title;

  return (
    <article className="group relative flex h-[400px] max-h-[436px] w-full max-w-[400px] flex-col gap-6 overflow-hidden rounded-2xl border border-white/80 bg-basement-light-grey p-6">
      <div className="flex flex-col gap-6">
        {showImage ? (
          <div className="relative h-[137px] w-full overflow-hidden rounded-md bg-black">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt ?? ""}
                fill
                sizes="(max-width: 768px) calc(100vw - 48px), 388px"
                priority={priority}
                className="select-none object-cover"
              />
            ) : (
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="absolute -left-3 bottom-[-0.24em] font-mono text-8xl font-black uppercase leading-none text-white md:text-[10rem]">
                  B
                </span>
                <span className="absolute left-[27%] top-[10%] h-[42%] w-[7%] bg-[#f2f2f2]" />
                <span className="absolute left-[48%] top-[10%] h-[86%] w-[7%] bg-[#f2f2f2]" />
                <span className="absolute left-[65%] top-[55%] h-[41%] w-[6%] bg-[#f2f2f2]" />
                <span className="absolute right-0 bottom-0 h-[43%] w-[18%] rounded-tl-[34px] border-[1.6rem] border-r-0 border-b-0 border-[#f2f2f2]" />
                <span className="absolute right-[30%] top-[10%] font-mono text-geist-mono-14 uppercase text-white">
                  {post.publishedAt ? formatDate(post.publishedAt) : dateFallback}
                  <br />
                  Journal
                </span>
              </div>
            )}
          </div>
        ) : null}

        <div className="flex flex-col items-start gap-4">
          {post.publishedAt ? (
            <time dateTime={post.publishedAt} className="block text-geist-13 font-semibold text-[#6f6f6f]">
              {formatDate(post.publishedAt)}
            </time>
          ) : null}

          <h2 className="text-geist-24 font-semibold text-black">
            <Link
              href={`/blog/${post.slug}`}
              aria-label={`Read more about ${post.title}`}
              className="outline-none focus-visible:rounded-ui focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange"
            >
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {post.title}
            </Link>
          </h2>

          {categoryTitle ? (
            <div className="flex flex-wrap items-start gap-1 text-geist-13 font-semibold text-[#c9c9c9]">
              <span className="inline-flex items-center justify-center bg-basement-light-grey px-0.5 text-basement-medium-grey">{categoryTitle}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-auto">
        <span className="inline-flex items-center self-start rounded bg-basement-light-grey px-2 py-1 font-mono text-geist-mono-14 font-medium uppercase leading-[0.9] text-black transition-colors duration-200 group-hover:text-basement-grey">
          <span aria-hidden="true">{ctaLabel}</span>
        </span>
      </div>
    </article>
  );
}
