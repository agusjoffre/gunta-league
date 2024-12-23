"use client";

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "react-query";
import { updateUser } from "@/lib/actions/auth/updateUser";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { User } from "@/lib/types";

type Props = {
  name: string | undefined;
  email: string;
};

const EditUserForm = (props: Props) => {
  const { toast } = useToast();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: async (userValues: Omit<User, "clerk_id">) =>
      updateUser(userValues),
    onError(err: any) {
      toast({
        title: "Error",
        description: err.message || "Algo salio mal.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }

      if (!data.success) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }

      toast({
        title: "Nombre actualizado con exito!",
        description: data.data?.name,
        variant: "success",
      });

      window.location.reload();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    mutate({ email: props.email, name, isAdmin: false });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Label className="flex flex-col gap-2 justify-center">
        <span>Nombre</span>
        <Input name="name" type="text" placeholder={props.name} required />
      </Label>

      <Button variant={"accent"} type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : "GUARDAR"}
      </Button>
    </form>
  );
};

export default EditUserForm;
