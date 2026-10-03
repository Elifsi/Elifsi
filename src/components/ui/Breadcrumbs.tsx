import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#667085]">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item.path} className="flex items-center gap-2">
            {idx > 0 && <span className="text-[#E5E7EB]">/</span>}
            {isLast ? (
              <span className="font-semibold text-[#111827]" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-[#F51F3D] transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
