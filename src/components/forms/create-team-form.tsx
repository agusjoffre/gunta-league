"use client";
import { createTeam } from "@/lib/actions/teamsActions";

import { useState } from "react";

import { Team, TeamSchemaType } from "@/lib/types.d";
import { TeamSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useToast } from "../ui/use-toast";

import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  tournament_id: string;
};

const CreateTeamForm = ({ tournament_id }: Props) => {
  const form = useForm<TeamSchemaType>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: "Equipo A",
      color: "#FFFFF",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (teamValues: Team) => createTeam(teamValues),
    onSuccess: (data) => {
      const teamData = data.data as Team;

      if (!data.success) {
        toast({
          title: data.message,
          description: `${data.error}. Por favor intentalo de nuevo.`,
          variant: "destructive",
        });
      }
      toast({
        title: "Equipo creado con exito!",
        description: teamData.name,
        variant: "success",
      });

      router.push(`/tournaments/${tournament_id}/teams/${teamData.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error!",
        description:
          error.message || "Algo salio mal. Por favor intentalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(teamValues: TeamSchemaType) {
    const values: Team = {
      ...teamValues,
      tournament_id,
    };

    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del equipo</FormLabel>
              <FormControl>
                <Input placeholder="Equipo A..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color del equipo</FormLabel>
              <FormControl>
                <HexColorPicker color={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Puedes agregar un color opcional. Default blanco.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL del logo</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://img.planetafobal.com/2022/12/afa-logos-tres-estrellas-mundiales-qa.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes agregar una url de la imagen del logo opcional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} variant={"accent"}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin bg-accent-foreground" />
          ) : (
            "CREAR EQUIPO"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTeamForm;
