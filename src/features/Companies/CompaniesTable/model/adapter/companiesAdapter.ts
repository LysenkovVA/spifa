import { createEntityAdapter } from "@reduxjs/toolkit";
import { Company } from "@/entities/Company";

export const companiesAdapter = createEntityAdapter<Company, string>({
  selectId: (entity) => entity.id,
});
