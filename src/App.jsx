import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Chatarea from "./components/Chatarea";
import Footer from "./components/Footer";
import { useThemeProvider } from "./zustang/ThemeProvider";
import { v4 as uuidv4 } from "uuid";

const exemploChat = {
  id: "1",
  title: "Exemplo de Chat",
  messages: [
    {
      id: "1",
      author: "me",
      body: "Olá, como você está?",
    },
    {
      id: "2",
      author: "ai",
      body: "Oi! Estou bem, obrigado. Como posso ajudar você hoje?",
    },
  ],
};

function Page() {
  const { theme } = useThemeProvider();

  const [sidebarOpened, setSidbarOpened] = useState(false);
  const [chatActive, setChatActive] = useState({});
  const [AILoading, setAILoading] = useState(false);

  /**********simulando chat************************** */
  const [chatList, setChatList] = useState([]);
  const [chatActiveId, setChatActiveId] = useState("");

  useEffect(() => {

      setChatActive(chatList.find(item => item.id === chatActiveId))


    
  }, [chatActiveId, chatList]);

  /************************************************* */

  /***********funcionalidade de botões *************8 */
  /* abre sidebar */
  const openSidebar = () => {
    setSidbarOpened(true);
  };

  /* fecha sidebar */
  const closeSidebar = () => {
    setSidbarOpened(false);
  };

  /* apagar conversas */
  const handleClearConversations = () => {
    // if (AILoading) return;
    // setChatActiveId("");
    // setChatList([]);
  };

  /* nova conversa */
  const handleNewChat = () => {
    // if (AILoading) return;
    // setChatActiveId("");
    // closeSidebar();
  };

  /* manda mensagem*/
  const handleSendMessage = (message) => {
    if (!chatActiveId) {
      // Creating new chat
      let newChatid = uuidv4();
      setChatList([
        {
          id: newChatid,
          title: message,
          messages: [{ id: uuidv4, author: "me", body: message }],
        },
        ...chatList,
      ]);

      setChatActiveId(newChatid);
    } else {
      // updating existing chat
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId
      );
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: "me",
        body: message,
      });

      setChatList(chatListClone);
    }

    setAILoading(true);
  };

  const handleLogOut = () => {};
  /************************************************** */

  return (
    <main
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gpt-gray" : "bg-white"
      }`}
    >
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
        onLogOut={handleLogOut}
      >
        ...
      </Sidebar>

      <section className="flex flex-col w-full text-white">
        <Header
          openSidebarClick={openSidebar}
          title={`blablabla`}
          newChatClick={handleNewChat}
        />

        <Chatarea chat={chatActive} loading={AILoading}/>

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  );
}

export default Page;
