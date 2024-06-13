"use client";
import supabase from "@/config/supabaseClient";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "./Table";
import { v4 as uuidv4 } from "uuid";

const Hero = () => {
  const [tableList, setTableList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      course: "",
      fees: null,
    },
  });

  // FETCH FUNCTION ==================================================

  const fetchData = async (id) => {
    try {
      let { data } = await supabase.from("demo").select("*");
      if (data) {
        setTableList(data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // SUBMIT FUNCTION ==================================================

  const onSubmit = async (value) => {
    try {
      let { data } = await supabase.from("demo").insert({
        name: value.name,
        email: value.email,
        course: value.course,
        fees: value.fees,
        id: editIndex ? editIndex : tableList.length + 1,
      });
      console.log(data, "data");
      reset();
      fetchData();
    } catch (error) {
      console.log(error, "error");
    }
  };

  // DELETE FUNCTION ==================================================
  const deleteHandler = async (index) => {
    const response = await supabase.from("demo").delete().eq("id", index);
    fetchData();
    console.log(response, "response");
  };

  // UPDATE FUNCTION ==================================================
  const updateHandler = async (index) => {
    console.log("indexindex", index);
    setEditIndex(index);
    const item = tableList.find((item) => item.id === index);
    if (item) {
      setValue("name", item.name);
      setValue("email", item.email);
      setValue("course", item.course);
      setValue("fees", item.fees);
    }
    const { data, error } = await supabase
      .from("demo")
      .update({
        name: item.name,
        email: item.email,
        course: item.course,
        fees: item.fees,
      })
      .eq("id", index);
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
      {tableList.length > 0 && (
        <Table
          tableList={tableList}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
};

export default Hero;
