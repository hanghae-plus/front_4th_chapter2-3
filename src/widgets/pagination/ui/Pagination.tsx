export const Pagination = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <slot name="left" />
      </div>
      <div className="flex items-center gap-2">
        <slot name="right" />
      </div>
    </div>
  )
}
