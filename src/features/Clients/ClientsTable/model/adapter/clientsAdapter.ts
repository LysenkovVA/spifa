import { createEntityAdapter } from "@reduxjs/toolkit";
import { Client } from "@/entities/Client";

export const clientsAdapter = createEntityAdapter<Client, string>({
  selectId: (entity) => entity.id,
});
