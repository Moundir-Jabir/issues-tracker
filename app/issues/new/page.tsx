"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Issue {
  title: string;
  description: string;
}

const page = () => {
  const { register, control, handleSubmit } = useForm<Issue>();
  const router = useRouter();

  const submitForm = (data: Issue) => {
    axios
      .post("/api/issues", data)
      .then((res) => router.push("/issues"))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => submitForm(data))}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE {...field} />}
      />
      <Button>Submit new issue</Button>
    </form>
  );
};

export default page;
