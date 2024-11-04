"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../config/store";
import { useSession } from "next-auth/react";

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  const session = useSession();

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(session.data);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
