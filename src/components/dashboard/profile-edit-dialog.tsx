import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import EditUserForm from "../forms/edit-user-form";

type Props = {
  name: string | undefined;
  email: string;
};

const ProfileEditDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="linearAccent">EDITAR</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica tu perfil.</DialogTitle>
          <DialogDescription>
            Aqui puedes modificar tu informacion personal.
          </DialogDescription>
        </DialogHeader>

        <EditUserForm name={props.name} email={props.email} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
