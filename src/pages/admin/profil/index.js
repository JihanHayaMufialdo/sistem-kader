import React, { useEffect, useState } from "react";
import CardProfile from "../../../components/Cards/CardProfile.js";
import Admin from "../../../layouts/Admin.js";
import { useRouter } from "next/router";
import { useAuth } from "../../admin/index.js";

export default function Profil() {
  useAuth();
  return (
    <>

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Profil.layout = Admin;
