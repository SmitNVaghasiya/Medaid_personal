import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import Cookies from "universal-cookie";
import "stream-chat-react/dist/css/index.css";
import "./index.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const customStyles: CustomStyles = {
  "--primary-color": "rgb(52, 71, 103)",
  "--bg-gradient-end": "#101214",
  "--bg-gradient-start": "#070a0d",
  "--black": "#344767",
  "--blue-alice": "#00193d",
  "--border": "#141924",
  "--button-background": "#ffffff",
  "--button-text": "#005fff",
  "--grey": "#344767",
  "--grey-gainsboro": "rgba(255, 255, 255, 0.8)",
  "--grey-whisper": "#ffffff",
  "--modal-shadow": "#ffffff",
  "--overlay": "rgb(52, 71, 103)",
  "--overlay-dark": "rgb(52, 71, 103)",
  "--shadow-icon": "#00000080",
  "--targetedMessageBackground": "#302d22",
  "--transparent": "transparent",
  "--white": "#ffffff",
  "--white-smoke": "#13151b",
  "--white-snow": "ffffff",
  "--border": "#ffffff",
};

const App = () => {
  const cookies = new Cookies();
  const apiKey = "48tbwy33e2sz";
  const authToken = cookies.get("user").token ?? "";
  const client = StreamChat.getInstance(apiKey);
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filters = { members: { $in: [cookies.get("user").userId] } };
  if (authToken) {
    try {
    } catch (e) {}
    client.connectUser(
      {
        id: cookies.get("user").userId,
        name: cookies.get("user").name,
      },
      authToken
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox style={{ height: "90%" }}>
        <Chat client={client} customStyles={customStyles}>
          <ChannelList filters={filters} />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </SuiBox>
    </DashboardLayout>
  );
};

export default App;
