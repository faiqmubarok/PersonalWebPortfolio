import Footer from '../../components/Footer/Footer'

const Portfolio = () => {
  return (
    <>
    <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300">
      <div className="px-14 pt-14 pb-10">
        <div className="flex items-center gap-7">
          <h1 className="font-roboto-slab font-extrabold text-3xl text-black dark:text-white">Portfolio</h1>
          <div className="w-32 h-1 bg-accentColor rounded-full"></div>
        </div>
      </div>
      <Footer isTrueDesign={ false }/>
    </main>
    </>
  )
}

export default Portfolio
