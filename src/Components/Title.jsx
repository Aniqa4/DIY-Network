function Title({ title }) {
  return (
    <div className="mb-8">
      <h2 className="font-ProtestStrike text-4xl text-ink">{title}</h2>
      <div className="mt-2.5 flex items-center gap-2">
        <div className="w-10 h-0.5 bg-phthalo" />
        <div className="w-2 h-0.5 bg-sienna" />
      </div>
    </div>
  );
}

export default Title;
