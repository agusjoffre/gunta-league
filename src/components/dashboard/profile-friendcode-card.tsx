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
import { getProfileFriendCode } from "@/lib/actions/profile/getProfileFriendCode";
import { ClipboardCopy, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {};

const ProfileFriendCode = (props: Props) => {
  const { toast } = useToast();

  const {
    data: profileFriendCodeData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["profileFriendCode"],
    queryFn: () => getProfileFriendCode(),
  });

  async function handleCopyToClipboard() {
    if (!profileFriendCodeData?.friend_code) {
      toast({
        title: "Error",
        description: "No se pudo copiar el codigo de amigo",
        variant: "destructive",
      });
      return;
    }

    await navigator.clipboard.writeText(profileFriendCodeData?.friend_code);

    toast({
      title: "Copiado al portapapeles",
      description: `Copiado el codigo de amigo: ${profileFriendCodeData?.friend_code}`,
      variant: "success",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Codigo de amigo</CardTitle>
        <CardDescription className="pt-4">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center gap-4">
              <Input value={profileFriendCodeData?.friend_code} readOnly />
              <Button
                variant={"outline"}
                className="p-2"
                onClick={handleCopyToClipboard}
              >
                <ClipboardCopy />
              </Button>
            </div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfileFriendCode;
