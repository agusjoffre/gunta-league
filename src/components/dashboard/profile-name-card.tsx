"use client";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getProfileName } from "@/lib/actions/profile/getProfileName";

type Props = {};

const ProfileNameCard = (props: Props) => {
  const {
    data: profileNameData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["profileName"],
    queryFn: () => getProfileName(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nombre</CardTitle>
        <CardDescription>
          {isLoading ? "Cargando..." : profileNameData?.name || "N/A"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfileNameCard;
