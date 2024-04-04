import React from "react";
import { Google } from "@mui/icons-material";
import { Button } from "../ui/button";

export default function GoogleAuth() {
  return (
    <div>
      <Button>
        <Google className="mr-2 h-4 w-4" /> Login with Google
      </Button>
    </div>
  );
}
