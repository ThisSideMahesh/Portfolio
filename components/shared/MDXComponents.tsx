import React from 'react';
import { cn } from '@/lib/utils/cn';

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('text-3xl font-extrabold tracking-tight text-zinc-100 mt-8 mb-4 font-sans', className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn('text-2xl font-bold tracking-tight text-zinc-200 mt-8 mb-4 border-b border-zinc-900 pb-2 font-sans', className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn('text-xl font-semibold tracking-tight text-zinc-200 mt-6 mb-3 font-sans', className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-sm sm:text-base text-zinc-300 leading-relaxed my-4', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('list-disc pl-6 my-4 space-y-2 text-zinc-300', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('list-decimal pl-6 my-4 space-y-2 text-zinc-300', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('text-sm sm:text-base leading-relaxed', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn('border-l-4 border-amber-500 bg-zinc-900/30 pl-4 py-1 pr-2 rounded my-6 text-zinc-400 italic', className)} {...props} />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn('border-zinc-900 my-8', className)} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn('overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 my-6 font-mono text-sm leading-relaxed', className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn('rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-amber-500 border border-zinc-800', className)} {...props} />
  )
};
