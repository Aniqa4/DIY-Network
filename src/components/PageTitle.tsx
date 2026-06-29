interface PageTitleProps {
  title: string
}

function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="font-semibold py-10 text-xl text-center">{title}</div>
  )
}

export default PageTitle
