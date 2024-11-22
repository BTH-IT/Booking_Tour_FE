import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { useEffect, useState } from 'react';

const useSignalR = (eventName: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [data, setData] = useState<any>(null);

  const hubUrl = import.meta.env.VITE_SIGNALR_URL || '';

  console.log('hubUrl', hubUrl);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [hubUrl]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to SignalR hub');
          connection.on(eventName, (receivedData) => {
            setData(receivedData);
          });
        })
        .catch((err) => console.error('Error connecting to SignalR hub', err));
    }
  }, [connection, eventName]);

  return data;
};

export default useSignalR;
