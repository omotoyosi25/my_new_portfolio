"use client"

import { useState } from "react"
import { Button } from "@/components/core/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/core/Form"
import { Input } from "@/components/core/Input"
import { Textarea } from "@/components/core/TextArea"
import { ArrowIcon } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import emailjs from "@emailjs/browser"

// Form validation schema
const formSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone_no: z.string().min(5, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState({ success: false, message: "" })

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_no: "",
      message: "",
    },
  })

  // Handle form submission
  const onSubmit = async (values: { full_name: any; email: any; phone_no: any; message: any }) => {
    setIsSubmitting(true)

    try {
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId = "YOUR_SERVICE_ID"
      const templateId = "YOUR_TEMPLATE_ID"
      const publicKey = "YOUR_PUBLIC_KEY"

      const templateParams = {
        from_name: values.full_name,
        from_email: values.email,
        phone_number: values.phone_no,
        message: values.message,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setFormStatus({
        success: true,
        message: "Thank you for reaching out. I'll get back to you soon.",
      })

      form.reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const my_projects = [
    {
      project_name: "blogging-platform",
      project_link: "http://myproject-spnz-4zmiyqtob-omotoyosi25.vercel.app",
      img: "/images/slug.png",
    },
    {
      project_name: "Roman Numeral Converter ",
      project_link: "https://omotoyosi25.github.io/frontendweek8/rom%20converter/index..html",
      img: "/images/roman.png",
    },
    {
      project_name: "slug-page",
      project_link: "https://stars-omotoyosi25.vercel.app/",
      img: "/images/projectscreen.png",
    },
  ]

  return (
    <main className="px-5 md:px-16 xl:px-20 pb-20">
      <section className="flex flex-col justify-center items-center gap-2 mt-10">
        <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
          <Image src="/images/abibat.jpg" alt="abibat" className="rounded-full" layout="fill" objectFit="cover" />
        </div>
        <p className="text-xl md:text-4xl font-bold font-sans text-[#dddddd]">Abibat Abdulraheem</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#32667d] to-[#91999c] font-bold">
          Frontend Developer
        </p>
        <p className="text-center md:px-32 text-sm text-[#696969]">
          A Frontend developer crafting elegant, high-performance web apps with HTML, CSS, JavaScript, and React. I turn
          complex ideas into smooth, responsive experiences. Strong eye for detail and usability. Committed to clean
          code, collaboration, and creating impactful digital solutions.
        </p>
        <Button
          className="hidden mt-2 md:flex border border-[#32667d] rounded-full px-4 py-1.5 text-xs xl:text-sm font-medium"
          type="button"
        >
          Contact Me
        </Button>
      </section>

      <section id="about" className="pt-40 flex flex-col justify-center items-center gap-2">
        <p className="text-xl md:text-4xl font-bold font-sans text-[#dddddd]">About Me</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#32667d] to-[#91999c] font-bold text-xs">
          Get to Know me
        </p>
        <p className="text-center md:px-32 text-sm text-[#696969]">
          Frontend developer crafting elegant, high-performance web apps with HTML, CSS, JavaScript, and React. I turn
          complex ideas into smooth, responsive experiences. Strong eye for detail and usability. Committed to clean
          code, collaboration, and creating impactful digital solutions.
        </p>
        <Button
          className="hidden mt-2 md:flex border border-[#32667d] rounded-full px-4 py-1.5 text-xs xl:text-sm font-medium"
          type="button"
        >
          Contact Me
        </Button>
      </section>
      <section id="Projects" className="pt-40 flex flex-col justify-center items-center gap-2">
        <p className="text-xl md:text-4xl font-bold font-sans text-[#dddddd]">My Projects</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#32667d] to-[#91999c] font-bold text-xs">
          Some of my projects
        </p>
        <article className="grid md:grid-cols-4 gap-4 mt-5">
          {my_projects?.map((project, index) => (
            <div key={index}>
              <Link href={project?.project_link}></Link>
              <Image
                src={project.img || "/placeholder.svg"}
                alt={project.project_name || "Project image"}
                width={300}
                height={400}
                className="object-cover"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="capitalize ">{project?.project_name}</div>
                <ArrowIcon />
              </div>
            </div>
          ))}
        </article>
        <Button
          className="hidden mt-2 md:flex border border-[#32667d] rounded-full px-10 py-3 text-xs xl:text-xs font-medium"
          type="button"
        >
          View All
        </Button>
      </section>
      <section id="contact" className="pt-40 flex flex-col items-center">
        <p className="text-xl md:text-4xl font-bold font-sans text-[#dddddd] mb-2">Contact Me</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#32667d] to-[#91999c] font-bold text-xs mb-8">
          Get in touch
        </p>

        <div className="h-full bg-black max-w-[507px] p-4 xl:p-8 rounded-xl w-full">
          <h2 className="font-medium text-white mb-8">Send me a message</h2>

          {formStatus.message && (
            <div
              className={`p-3 mb-4 rounded-md ${formStatus.success ? "bg-green-800/20 text-green-400" : "bg-red-800/20 text-red-400"}`}
            >
              {formStatus.message}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full name"
                        className="bg-[#222222] border-0 text-white h-14 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="bg-[#222222] border-0 text-white h-14 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_no"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone no"
                        className="bg-[#222222] border-0 text-white h-14 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        className="bg-[#222222] border-0 text-white min-h-[130px] rounded-md resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-white text-black hover:bg-gray-200 h-12 px-10 rounded-md font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default Page
