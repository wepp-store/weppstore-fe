import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  paths: { path: string; name: string }[];
}

export default function CustomBreadcrumbs({ paths }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Breadcrumbs
      underline="active"
      onAction={(key) => push(key as string)}
      className="mb-4"
      itemClasses={{ item: 'text-lg' }}
    >
      {paths.map(({ path, name }) => (
        <BreadcrumbItem key={path} isCurrent={pathname === path}>
          {name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
