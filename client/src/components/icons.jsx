const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icon = (paths) =>
  function Icon(props) {
    return (
      <svg {...base} {...props} aria-hidden="true">
        {paths}
      </svg>
    )
  }

export const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
)
export const TrashIcon = icon(<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />)
export const EditIcon = icon(
  <>
    <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" />
    <path d="M17.5 3.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
  </>,
)
export const CloseIcon = icon(<path d="M6 6l12 12M18 6 6 18" />)
export const BackIcon = icon(<path d="M19 12H5M11 6l-6 6 6 6" />)
export const CheckIcon = icon(<path d="m5 12 5 5 9-10" />)
export const ChevronLeft = icon(<path d="m15 6-6 6 6 6" />)
export const ChevronRight = icon(<path d="m9 6 6 6-6 6" />)
