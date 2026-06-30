import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--canvas)] px-6">
      <div className="text-center max-w-md">
        <p className="font-ProtestStrike text-[9rem] leading-none text-[var(--canvas-dark)] select-none mb-2">
          404
        </p>
        <h1 className="font-ProtestStrike text-3xl text-ink mb-3">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-phthalo text-white rounded-full text-sm font-medium hover:bg-phthalo/90 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 border border-gray-200 text-ink rounded-full text-sm font-medium hover:border-gray-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
