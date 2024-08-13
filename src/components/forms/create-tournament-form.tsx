"use client";
import { createTournament } from "@/lib/actions/tournamentActions";
import {
  Tournament,
  TournamentSchemaType,
  TournamentTypes,
} from "@/lib/types.d";
import { TournamentSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useToast } from "../ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const CreateTournamentForm = (props: Props) => {
  const form = useForm<TournamentSchemaType>({
    resolver: zodResolver(TournamentSchema),
    defaultValues: {
      pts_win: "3",
      pts_defeat: "0",
      pts_draw: "1",
      type: TournamentTypes.ROUND_ROBIN,
      name: "Nuevo Torneo",
      description: "Descripcion del torneo...",
      sport: "Futbol",
      rounds: "2",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (tournamentValues: Tournament) =>
      createTournament(tournamentValues),
    onSuccess: (data) => {
      const tournamentData = data.data as Tournament;

      if (!data.success) {
        toast({
          title: data.message,
          description: `${data.error}. Por favor intentalo de nuevo.`,
          variant: "destructive",
        });
      }
      toast({
        title: "Torneo creado con exito!",
        description: tournamentData.name,
        variant: "success",
      });

      router.push(`/tournaments/${tournamentData.id}`);
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

  function onSubmit(tournnamentValues: TournamentSchemaType) {
    const pts_win = Number(tournnamentValues.pts_win);
    const pts_draw = Number(tournnamentValues.pts_draw);
    const pts_defeat = Number(tournnamentValues.pts_defeat);
    const rounds = Number(tournnamentValues.rounds);

    const values: Tournament = {
      ...tournnamentValues,
      pts_win,
      pts_draw,
      pts_defeat,
      rounds,
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
              <FormLabel>Nombre del torneo</FormLabel>
              <FormControl>
                <Input placeholder="Nuevo torneo..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion del torneo</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-28 min-h-28"
                  maxLength={255}
                  placeholder="Descripcion del torneo..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes agregar una descripción opcional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold underline-offset-2 underline">
            Reglas
          </h1>
          <FormField
            control={form.control}
            name="pts_win"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntos por victoria</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Puntos por victoria..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Cada victoria suma {field.value} puntos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pts_draw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntos por empate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Puntos por empate..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Cada empate suma {field.value} puntos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pts_defeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntos por derrota</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Puntos por derrota..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Cada derrota suma {field.value} puntos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de rondas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Numero de rondas..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ida y vuelta son 2 rondas. Maximo 10.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de torneo</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Tipo de torneo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round_robin">
                        Round Robin - Todos contra todos
                      </SelectItem>
                      <SelectItem value="elimination">
                        Eliminacion directa
                      </SelectItem>
                      <SelectItem value="group_phase_elimination">
                        Fase de grupos y eliminacion directa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Elige el tipo de torneo. Default: Round Robin - Todos contra
                  todos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deporte</FormLabel>
              <FormControl>
                <Input placeholder="Deporte..." {...field} />
              </FormControl>
              <FormDescription>
                Puedes agregar deporte o juego opcional.
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
            "CREAR TORNEO"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTournamentForm;
