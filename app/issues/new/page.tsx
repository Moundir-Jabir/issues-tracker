"use client";
import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIssueSchema } from "@/app/ValidationSchema";
import z from "zod";
import ErrorValidationMessage from "@/app/components/ErrorValidationMessage";
import Spinner from "@/app/components/Spinner";

type Issue = z.infer<typeof newIssueSchema>;

const page = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(newIssueSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const submitForm = (data: Issue) => {
    setIsSubmiting(true);
    axios
      .post("/api/issues", data)
      .then((res) => {
        setIsSubmiting(false);
        router.push("/issues");
      })
      .catch((err) => {
        setIsSubmiting(false);
        setErrorMessage("An unexpected error occurred.");
      });
  };

  const onSubmit = handleSubmit((data) => submitForm(data));

  return (
    <div className="max-w-xl">
      {errorMessage && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorValidationMessage>{errors.title?.message}</ErrorValidationMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <ErrorValidationMessage>
          {errors.description?.message}
        </ErrorValidationMessage>
        <Button disabled={isSubmiting}>
          Submit new issue {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default page;
