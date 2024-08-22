import { useState } from "react"
import Footer from "../components/Footer/Footer"
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    emailjs.sendForm('service_73lyux4', 'template_useojjj', e.target, 'W_H5i-ggztnGjCtys')
      .then(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
      }, () => {
        alert('Failed to send message.');
        setLoading(false);
      });
  }

  return (
    <>
      <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
      <div className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
        <div className="flex items-center gap-7 mb-6">
          <h1 className="font-roboto-slab font-extrabold text-3xl text-black dark:text-white">Contact</h1>
          <div className="w-32 h-1 bg-accentColor rounded-full"></div>
        </div>
        <div className="leading-6 text-sm space-y-4 text-justify font-poppins text-lightSecondary dark:text-darkSecondary">
          <p>
          Feel free to contact me for any questions, job offers, or just to connect. I&apos;m open to new opportunities and collaborations!.
          </p>
          <p>
          Fill out the form below, and I&apos;ll respond as soon as possible. Thank you for visiting my portfolio!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="relative z-0">
            <input 
            type="text" 
            id="name" 
            name="name"
            placeholder=" " 
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="block py-2.5 px-0 w-full text-sm text-lightSecondary bg-transparent border-b-2  border-darkSecondary/40 appearance-none dark:text-darkSecondary dark:border-darkSecondary/40 dark:focus:border-accentColor focus:outline-none focus:ring-0 focus:border-accentColor peer" />
            <label 
            htmlFor="name" 
            className="absolute text-sm text-lightSecondary dark:text-darkSecondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-accentColor peer-focus:dark:text-accentColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Input your name
            </label>
          </div>
          <div className="relative z-0">
            <input 
            type="email" 
            id="email" 
            name="email"
            placeholder=" " 
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="block py-2.5 px-0 w-full text-sm text-lightSecondary bg-transparent border-b-2 border-darkSecondary/40 appearance-none dark:text-darkSecondary dark:border-darkSecondary/40 dark:focus:border-accentColor focus:outline-none focus:ring-0 focus:border-accentColor peer" />
            <label 
            htmlFor="email" 
            className="absolute text-sm text-lightSecondary dark:text-darkSecondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-accentColor peer-focus:dark:text-accentColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Input your email
            </label>
          </div>
          <div className="relative z-0">
            <textarea 
            name="message"
            rows={6} 
            id="message" 
            placeholder=" "
            value={formData.message}
            onChange={handleChange}
            autoComplete="off"
            required
            className="block py-2.5 px-0 w-full text-sm text-lightSecondary bg-transparent border-b-2 border-darkSecondary/40 appearance-none dark:text-darkSecondary dark:border-darkSecondary/40 dark:focus:border-accentColor focus:outline-none focus:ring-0 focus:border-accentColor peer"  />
            <label 
            htmlFor="message" 
            className="absolute text-sm text-lightSecondary dark:text-darkSecondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-accentColor peer-focus:dark:text-accentColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Leave your message here
            </label>
          </div>
          <div className="w-full justify-end flex">
          <button 
          type="submit"
          disabled={loading}
          className="text-white text-center w-full lg:w-fit bg-accentColor lg:bg-transparent lg:border lg:border-accentColor lg:text-accentColor lg:hover:bg-accentColor lg:hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-colors duration-200 ease-in-out">
            {loading ? "Sending" : "Send"}
          </button>
          </div>
        </form>
      </div>
      
      <Footer isTrueDesign={ false }/>
    </main>
    </>
  )
}

export default Contact
