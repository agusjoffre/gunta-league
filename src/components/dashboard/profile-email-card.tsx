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
import { getProfileEmail } from "@/lib/actions/profile/getProfileEmail";
import { Loader2 } from "lucide-react";

type Props = {};

const ProfileEmailCard = (props: Props) => {
  const {
    data: profileEmailData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["profileEmail"],
    queryFn: () => getProfileEmail(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            profileEmailData?.email || "N/A"
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfileEmailCard;
