import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Toaster, toast } from 'sonner';

function App() {
  const validationSchema = yup.object({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    email: yup.string().required("This field is required").email("Please enter a valid email address"),
    query: yup.string().required("Please select a query type"),
    message: yup.string().required("This field is required"),
    agreement: yup.boolean().oneOf([true], "To submit this form, please consent to being contacted"),
  })

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      query: "",
      message: "",
      agreement: false,
    }
  })

  const onSuccess = (data) => {
    reset()
    toast(
      <div className="p-2 text-white">
        <div className="flex items-center gap-3">
          <img src="/images/icon-success-check.svg" alt="Check Mark" />
          <span className="font-medium text-sm">Message Sent!</span>
        </div>
        <p className="mt-2.5 text-gray-300 ">Thanks for completing this form, We'll be in touch soon!</p>
      </div>,
      {
        className: "!bg-[#2b4246] !border-none md:!w-fit md:!text-nowrap",
      }
    )
  }

  const submission = handleSubmit(onSuccess)

  return (
    <main className="min-h-screen bg-Green-200-lighter">
      <div className="container py-10 min-h-screen grid place-items-center">
        <form className="form-box p-8 rounded-lg bg-white shadow w-[700px] max-md:w-full flex flex-col gap-8" onSubmit={submission}>
          <h1 className="text-3xl font-bold  text-Grey-900-darker">Contact Us</h1>
          <div className="flex gap-4 max-md:flex-col">
            <label className="w-full">
              <span className="block font-medium text-Grey-500-medium mb-2">
                First Name
                <span className="required">*</span>
              </span>
              <input type="text" name="firstName" className={errors.email && 'error'} {...register("firstName")} />
              {errors.firstName && <span className="text-Red block mt-2 text-sm">{errors.firstName.message}</span>}
            </label>
            <label className="w-full">
              <span className="block font-medium text-Grey-500-medium mb-2">
                Last Name
                <span className="required">*</span>
              </span>
              <input type="text" name="lastName" className={errors.email && 'error'} {...register("lastName")} />
              {errors.lastName && <span className="text-Red block mt-2 text-sm">{errors.lastName.message}</span>}
            </label>
          </div>
          <label className="w-full block">
            <span className="block font-medium text-Grey-500-medium mb-2">
              Email Address
              <span className="required">*</span>
            </span>
            <input type="email" name="email" placeholder="email@example.com" className={errors.email && 'error'} {...register("email")} />
            {errors.email && <span className="text-Red block mt-2 text-sm">{errors.email.message}</span>}
          </label>
          <div className="w-full">
            <span className="block font-medium text-Grey-500-medium mb-2">
              Query Type
              <span className="required">*</span>
            </span>
            <div className="flex w-full gap-4 max-md:flex-col">
              <label className="group rounded-lg cursor-pointer transition-all ease-out w-full flex items-center gap-2 p-3 px-4 border border-Grey-500-medium hover:bg-Green-200-lighter has-[input:checked]:bg-Green-200-lighter">
                <input type="radio" name="query" value={"general enquiry"} className="hidden" {...register("query")} />
                <span className="w-4 h-4 transition-all ease-out grid place-items-center rounded-full border border-Grey-500-medium group-has-[input:checked]:border-Green-600-medium">
                  <span className="w-2.5 h-2.5 bg-Green-600-medium opacity-0 rounded-full transition-all ease-out group-has-[input:checked]:opacity-100"></span>
                </span>
                <span className="block">General Enquiry</span>
              </label>
              <label className="group rounded-lg cursor-pointer transition-all ease-out w-full flex items-center gap-2 p-3 px-4 border border-Grey-500-medium hover:bg-Green-200-lighter has-[input:checked]:bg-Green-200-lighter">
                <input type="radio" name="query" value={"support request"} className="hidden" {...register("query")} />
                <span className="w-4 h-4 transition-all ease-out grid place-items-center rounded-full border border-Grey-500-medium group-has-[input:checked]:border-Green-600-medium">
                  <span className="w-2.5 h-2.5 bg-Green-600-medium opacity-0 rounded-full transition-all ease-out group-has-[input:checked]:opacity-100"></span>
                </span>
                <span className="block">Support Request</span>
              </label>
            </div>
            {errors.query && <span className="text-Red block mt-2 text-sm">{errors.query.message}</span>}
          </div>
          <label className="w-full block">
            <span className="block font-medium text-Grey-500-medium mb-2">
              Message
              <span className="required">*</span>
            </span>
            <textarea rows={5} name="message" className={errors.message && 'error'} {...register("message")}></textarea>
            {errors.message && <span className="text-Red block mt-2 text-sm">{errors.message.message}</span>}
          </label>
          <label className="w-full cursor-pointer">
            <div className="flex items-center gap-4">
              <input type="checkbox" name="agreement" className="!w-4 !h-4 cursor-pointer checked:bg-Green-600-medium accent-Green-600-medium " {...register("agreement")} />
              <span>I consent to being contacted by the team</span>
            </div>
            {errors.agreement && <span className="text-Red block mt-2 text-sm">{errors.agreement.message}</span>}
          </label>
          <button className="w-full cursor-pointer transition-all ease-out font-medium bg-Green-600-medium hover:bg-Green-900-darker text-white p-3 px-4 rounded-lg">Submit</button>
        </form>
      </div>
      <Toaster position="top-center" />
    </main>
  )
}

export default App
