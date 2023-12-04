export interface Breadcrumb {
  name: string
  path?: string
}

export interface BreadcrumbProps {
  breadcrumbs: Breadcrumb[]
}
