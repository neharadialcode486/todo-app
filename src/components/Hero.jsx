"use client";
import supabase from "@/config/supabaseClient";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "./Table";

const Hero = () => {
  const [tableList, setTableList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [image, setImg] = useState("");
  // console.log(tableList, "tableList");
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
      picture: "",
    },
  });

  // FETCH FUNCTION ==================================================

  const fetchData = async () => {
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
    setImg(value.picture[0].name);
    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(`/public/${value.picture[0].name}`, value.picture[0], {
          cacheControl: "3600",
          upsert: false,
        });
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(`public/${image}`);

      if (editIndex !== null && data.publicUrl) {
        await supabase
          .from("demo")
          .update({
            name: value.name,
            email: value.email,
            course: value.course,
            fees: value.fees,
            picture: data.publicUrl,
          })
          .eq("id", editIndex);
        setEditIndex(null);
      } else {
        if (data.publicUrl) {
          await supabase.from("demo").insert({
            name: value.name,
            email: value.email,
            course: value.course,
            fees: value.fees,
            picture: data.publicUrl,
          });
        }
      }
      // reset();
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
  const updateHandler = async (id) => {
    const item = tableList.find((item) => item.id === id);
    if (item) {
      setValue("name", item.name);
      setValue("email", item.email);
      setValue("course", item.course);
      setValue("fees", item.fees);
      setEditIndex(id);
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
        <input
          type="file"
          {...register("picture", { required: true })}
          className="border-blue-400 bg-transparent border w-full my-5inline-block p-5 mt-4 mb-2"
        />
        {errors.picture && <span>Picture not found</span>}
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
