export default function ProductLoading() {
  return (
    <div className="pt-20 pb-12 md:pb-20 max-w-[1200px] mx-auto px-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image gallery skeleton */}
        <div className="aspect-square bg-[#1E1854]/5 rounded-2xl" />
        {/* Info skeleton */}
        <div className="space-y-6 pt-8 md:pt-12 pl-0 md:pl-8 lg:pl-12">
          <div className="space-y-3">
            <div className="h-3 w-32 bg-[#1E1854]/8 rounded-full" />
            <div className="h-8 w-56 bg-[#1E1854]/8 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-[#1E1854]/5 rounded-full" />
            <div className="h-3 w-4/5 bg-[#1E1854]/5 rounded-full" />
            <div className="h-3 w-3/5 bg-[#1E1854]/5 rounded-full" />
          </div>
          <div className="h-12 w-48 bg-[#1E1854]/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}