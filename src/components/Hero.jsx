"use client";
import supabase from "@/config/supabaseClient";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Hero = () => {
  const [tableList, setTableList] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      course: "",
      fees: null,
    },
  });
  const fetchData = async (id) => {
    try {
      let { data } = await supabase.from("demo").select("*");
      if (data) {
        setTableList(data);
        console.log("Data:", data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  React.useEffect(() => {
    fetchData(1);
  }, []);

  const onSubmit = async (data) => {
    try {
      // reset();
    } catch (error) {
      // console.log(error, "error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="py-5 text-center text-3xl font-bold uppercase">
        Contact form
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[700px] mx-auto "
      >
        <input
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4 mb-2"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}
        <input
          placeholder="Email"
          type="email"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4 mb-2"
          {...register("email", { required: "Email Address is required" })}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
        <input
          placeholder="Course"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4 mb-2"
          {...register("course", { required: "Course is required!!" })}
        />
        {errors.course && <p role="alert">{errors.course.message}</p>}
        <input
          placeholder="Fees"
          type="number"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4 mb-2"
          {...register("fees", { required: true })}
        />
        {errors.fees && <span>This field is required</span>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-4 rounded-sm mt-6"
          >
            Submit
          </button>
        </div>
      </form>
      {tableList && (
        <table className="w-full mt-10 ">
          <tr>
            <th className="border text-start px-3 py-2">Name</th>
            <th className="border text-start px-3 py-2">Email</th>
            <th className="border text-start px-3 py-2">Course</th>
            <th className="border text-start px-3 py-2">Fees</th>
          </tr>
          {tableList &&
            tableList.map((obj, i) => (
              <tr>
                <td className="border py-2 px-3"> {obj.Name}</td>
                <td className="border py-2 px-3">{obj.Email}</td>
                <td className="border py-2 px-3">Germany</td>
                <td className="border py-2 px-3">Germany</td>
              </tr>
            ))}
        </table>
      )}
    </div>
  );
};

export default Hero;
