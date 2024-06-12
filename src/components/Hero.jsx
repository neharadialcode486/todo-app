"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Hero = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
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
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4"
          placeholder="Name"
          {...register("name")}
        />
        <input
          placeholder="Email"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4"
          {...register("email", { required: true })}
        />
        <input
          placeholder="Course"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4"
          {...register("course", { required: true })}
        />
        <input
          placeholder="Fees"
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4"
          {...register("fees", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-4 rounded-sm mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hero;
