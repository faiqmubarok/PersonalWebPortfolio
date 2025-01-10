import { useEffect, useState, useRef, useCallback } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useAlert } from "../../context/AlertContext";
import useDebounce from "../../hooks/useDebounce";
import { Typography, Card, Button } from "@material-tailwind/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMessages, updateMessage, deleteMessage } from "../../api/message";
import Modal from "../../components/Modal/Modal";

// Molecule
import ListMessage from "../../components/List/ListMessage";
import DetailMessageHeader from "../../components/Molecule/Message/DetailMessageHeader";
import ListMessageHeader from "../../components/List/ListMessageHeader";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const isInitialRender = useRef(true);
  const chatsRef = useRef([]);
  const { showAlert } = useAlert();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCurrentTitle("Messages");
    setBreadcrumbs([{ name: "Messages", path: "/messages" }]);
  }, [setBreadcrumbs, setCurrentTitle]);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await getMessages(page, activeFilter, debouncedValue);
      const { messages: data, totalPages: newTotalPages } = response;

      setChats((prevChats) => {
        const mergedChats = [
          ...prevChats,
          ...data.filter(
            (message) => !prevChats.some((chat) => chat._id === message._id)
          ),
        ];
        chatsRef.current = mergedChats;
        return mergedChats;
      });

      setTotalPages(newTotalPages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [page, activeFilter, debouncedValue]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    setChats([]);
    setPage(1);
  }, [debouncedValue, activeFilter]);

  const applyFilter = ({ value }) => {
    setChats([]);
    setPage(1);
    setActiveFilter(value);
  };

  const loadMoreMessages = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);

    if (!chat.isRead) {
      // Optimistic update
      setChats((prevChats) =>
        prevChats.map((c) => (c._id === chat._id ? { ...c, isRead: true } : c))
      );

      chatsRef.current = chatsRef.current.map((c) =>
        c._id === chat._id ? { ...c, isRead: true } : c
      );

      try {
        const updated = await updateMessage(chat._id, { isRead: true });
        if (!updated.ok) {
          // Rollback jika gagal
          setChats((prevChats) =>
            prevChats.map((c) =>
              c._id === chat._id ? { ...c, isRead: false } : c
            )
          );
          chatsRef.current = chatsRef.current.map((c) =>
            c._id === chat._id ? { ...c, isRead: false } : c
          );
        }
      } catch (error) {
        console.error("Error updating message:", error);
      }
    }
  };

  const handleToggleImportant = async (chat) => {
    const updatedIsImportant = !chat.isImportant;

    try {
      const updated = await updateMessage(chat._id, {
        isImportant: updatedIsImportant,
      });

      if (updated.ok) {
        // Rollback jika gagal
        setChats((prevChats) =>
          prevChats.map((c) =>
            c._id === chat._id ? { ...c, isImportant: chat.isImportant } : c
          )
        );
        chatsRef.current = chatsRef.current.map((c) =>
          c._id === chat._id ? { ...c, isImportant: chat.isImportant } : c
        );
      } else {
        showAlert(
          "success",
          updated?.message || "Message updated successfully"
        );
      }
    } catch (error) {
      console.error("Error updating message:", error);
      showAlert("error", "An error occurred while updating the message");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await deleteMessage(id);
      if (response.ok) {
        setChats((prevChats) => prevChats.filter((chat) => chat._id !== id));
        chatsRef.current = chatsRef.current.filter((chat) => chat._id !== id);
        showAlert("success", "Message deleted successfully");
        setSelectedChat(null);
      } else {
        console.error("Error deleting message:", response.message);
        showAlert("error", response.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      showAlert("error", error.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 w-full h-full no-scrollbar">
        {/* List Chat */}
        <Card
          className={`border border-gray-300 col-span-12 md:col-span-5 lg:col-span-4 p-4 h-full ${
            selectedChat ? "hidden md:block" : "block"
          }`}
        >
          <ListMessageHeader
            activeFilter={activeFilter}
            applyFilter={applyFilter}
            search={search}
            setSearch={setSearch}
          />
          <InfiniteScroll
            dataLength={chats.length}
            next={loadMoreMessages}
            hasMore={page < totalPages}
            loader={
              <p className="text-sm w-full text-center mt-4">
                Loading more messages...
              </p>
            }
            endMessage={
              <p className="text-sm w-full text-center mt-4">
                No more messages to display.
              </p>
            }
            scrollableTarget="message-container"
          >
            <ul
              id="message-container"
              className="mt-4 flex flex-col gap-2 overflow-y-auto max-h-[65vh] xl:max-h-[60vh] no-scrollbar"
            >
              {chats.map((chat, index) => (
                <ListMessage
                  key={index}
                  chat={chat}
                  selectedChat={selectedChat}
                  handleSelectChat={handleSelectChat}
                />
              ))}
            </ul>
          </InfiniteScroll>
        </Card>

        {/* Detail Chat */}
        <Card
          className={`border border-gray-300 col-span-12 md:col-span-7 lg:col-span-8 p-4 lg:p-6 ${
            selectedChat ? "block" : "hidden md:block"
          }`}
        >
          {selectedChat && (
            <DetailMessageHeader
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              handleToggleImportant={handleToggleImportant}
              setModalOpen={setModalOpen}
            />
          )}
          <div className={`py-6 ${selectedChat ? "h-fit" : "h-full"}`}>
            {selectedChat ? (
              <p className="text-gray-500 text-base font-normal">
                {selectedChat.message}
              </p>
            ) : (
              <div className="flex h-full items-center justify-center bg-white">
                <p className="text-gray-500 ">No chat selected.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Modal
        headerText="Delete Message"
        open={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        footer={
          <div className="flex justify-center space-x-4 w-full">
            <Button
              variant="outlined"
              color="red"
              onClick={() => setModalOpen(!modalOpen)}
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                setModalOpen(!modalOpen);
                handleDeleteMessage(selectedChat._id);
              }}
              className="w-32"
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-center text-gray-600">
            Are you sure deleted message from
          </p>
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-center text-black font-semibold"
          >
            {selectedChat?.name}?
          </Typography>
          <p className="text-center text-gray-600">
            This action cannot be undone
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Messages;
