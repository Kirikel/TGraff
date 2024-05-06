import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { createContext, useContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";

const SocketContext = createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>(undefined);

export function useSocket() {
  return useContext(SocketContext);
}

interface ISocketProviderProps {
  id: string;
  children: React.ReactNode;
}

export function SocketProvider({ id, children }: ISocketProviderProps) {
  const [socket, setSocket] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();

  useEffect(() => {
    const newSocket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
      "http://localhost:3000",
      { query: { id } }
    );
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
