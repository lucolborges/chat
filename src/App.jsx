import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Chatarea from "./components/Chatarea";
import Footer from "./components/Footer";
import { useThemeProvider } from "./zustang/ThemeProvider";
import { v4 as uuidv4 } from "uuid";
import SideBarChatButton from "./components/SideBarChatButton";

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

  const [chatActive, setChatActive] = useState({});
  const [AILoading, setAILoading] = useState(false);

  /**********simulando chat************************** */
  const [chatList, setChatList] = useState([]);
  const [chatActiveId, setChatActiveId] = useState("");

  useEffect(() => {
      setChatActive(chatList.find(item => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if(AILoading) {
      getAiResponse();
    }
  }, [AILoading])

  const getAiResponse = () => {
    setTimeout(() => {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      if(chatIndex > -1){
        chatListClone[chatIndex].messages.push({
          id: uuidv4, author: 'ai', body: 'Aqui está a resposta da AI'
        })
      }
      setChatList(chatListClone);
      setAILoading(false);
    }, 2000)
  }

  /************************************************* */

  /***********funcionalidade de botões *************8 */
  const {setSideBarOpened} = useThemeProvider();

  /* apagar conversas */
  const handleClearConversations = () => {
    if (AILoading) return;
    setChatActiveId("");
    setChatList([]);
  };

  /* nova conversa */
  const handleNewChat = () => {
    if (AILoading) return;
    setChatActiveId("");
    setSideBarOpened()
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

  /***********************funções no SideBarChatButton *********8 */

  /*** indica chat ativo na barra lateral */
  const handleSelectChat = (id) => {
    if(AILoading) return;
    let item = chatList.find(item => item.id === id)
    if(item) setChatActiveId(item.id)
  };

  const handleDeleteChat = () => {

  };

  return (
    <main
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gpt-gray" : "bg-white"
      }`}
    >
      <Sidebar
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
        onLogOut={handleLogOut}
      >
        {chatList.map(item => (
          <SideBarChatButton
          key={item.id}
          chatItem={item}
          active={item.id === chatActiveId}
          onClick={handleSelectChat}
          onDelete={handleDeleteChat}
          />
        ))}
      </Sidebar>

      <section className="flex flex-col w-full text-white">
        <Header
          title={chatActive ? chatActive.title : 'ZipChat'}
          newChatClick={handleNewChat}
        />

        <Chatarea chat={chatActive} loading={AILoading}/>

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  );
}

export default Page;
