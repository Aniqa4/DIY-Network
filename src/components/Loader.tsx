function Loader() {
  return (
    <div className="grid grid-cols-6 gap-3 pb-10">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-[#a0a0a093] h-64 rounded animate-pulse" />
      ))}
    </div>
  )
}

export default Loader
