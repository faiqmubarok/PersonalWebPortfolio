import { spiral } from 'ldrs'
spiral.register()

const Loader = () => {
  return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
        <l-spiral
        size="40"
        speed="0.9" 
        color="#1A73E3" 
        ></l-spiral>
    </div>
    </>
  )
}

export default Loader
