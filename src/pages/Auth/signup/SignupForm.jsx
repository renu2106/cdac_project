// /* eslint-disable no-unused-vars */
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "@/Redux/Auth/Action";
// import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

// const formSchema = z.object({
//   fullName: z.string().nonempty("Full name is required"),
//   email: z.string().email("Invalid email address").optional(),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .optional(),
// });
// const SignupForm = () => {
//   const {auth}=useSelector(store=>store)

//   const navigate=useNavigate();
//   const dispatch=useDispatch()
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       fullName: "",
//     },
//   });
//   const onSubmit = (data) => {
//     data.navigate=navigate
//     dispatch(register(data))
//     console.log("signup form", data);
//   };
//   return (
//     <div className="space-y-5">
//        <h1 className="text-center text-xl">Create New Account</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="text"
//                     className="border w-full border-gray-700 py-5 px-5"
//                     placeholder="Enter your full name"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     className="border w-full border-gray-700 py-5 px-5"
//                     placeholder="enter your email"
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="password" 
//                     className="border w-full border-gray-700 py-5 px-5"
//                     placeholder="Enter your password"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//          {!auth.loading? <Button type="submit" className="w-full  py-5">
//             Register
//           </Button>:<SpinnerBackdrop show={true}/>}
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default SignupForm;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { register } from "@/Redux/Auth/Action";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(register(data));
    setShowPopup(true); // Show success popup

    // Hide the popup automatically after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="space-y-5 max-w-md mx-auto">
      <h1 className="text-center text-2xl font-semibold">Create New Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Enter password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>

      {/* Auto-Dismiss Popup for Success Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">Registration Successful</h2>
            <p className="text-gray-600 mt-2">Your account has been created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
