import { useState, useRef, ChangeEvent } from "react";
import type { MqttClient } from "mqtt";
import useMqtt from "../lib/useMqtt";

export default function Home() {
  const incommingMessageHandlers = useRef([
    {
      topic: "topic1",
      handler: (msg: string) => {},
    },
  ]);

  const mqttClientRef = useRef<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    mqttClientRef.current = client;
  };
  useMqtt({
    uri: process.env.NEXT_PUBLIC_MQTT_URI,
    options: {
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: process.env.NEXT_PUBLIC_MQTT_CLIENTID,
    },
    topicHandlers: incommingMessageHandlers.current,
    onConnectedHandler: (client) => setMqttClient(client),
  });

  const publishMessages = (client: any, product: string) => {
    if (!client) {
      console.log("(publishMessages) Cannot publish, mqttClient: ", client);
      return;
    }

    client.publish("topic1", product);
  };

  const [buttonText, setButtonText] = useState('Start');

  const handleClick = () => {
    if (buttonText === 'Start') {
      setButtonText('Stop');
    } else {
      setButtonText('Start');
    }
  };

  const productChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(`${event.target.value}`);
    publishMessages(mqttClientRef.current, event.target.value);
  }

  return (
    <div>
      <select onChange={event => productChanged(event)}>
        <option>Product A</option>
        <option>Product B</option>
      </select>
      <button type="button"
        onClick={handleClick}>{buttonText}
      </button>
    </div>
  );
}
