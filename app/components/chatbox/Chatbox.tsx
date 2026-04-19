import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "./components/Message";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { MessageType } from "@types";
import { handleError } from "@store/globalSlice";
import InModalErroDisplay from "@components/InModalErrorDisplay";

function Chatbox({ orderId, setChatOpen, userName }: ChatboxProps) {
  const { apiLink, accessToken, userDetails } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch<AppDispatch>();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState("");
  const [fetchMessages, setFetchMessages] = useState(true);
  const [messageSending, setMessageSending] = useState(false);
  const [getMessagesError, setGetMessagesError] = useState({
    error: false,
    errorMessage: "",
  });

  const { credentials } = userDetails;
  const getMessages = useCallback(async () => {
    try {
      const response = await axios.post(
        apiLink + "/chat-messages",
        {
          credentialsToken: credentials,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { messages } = response.data;
      setMessages(messages.length > 0 ? messages : []);
    } catch (err: any) {
      console.log(err);
      setGetMessagesError((prev) => {
        return {
          ...prev,
          error: true,
          errorMessage: err.response.data.message,
        };
      });
    }
    setFetchMessages(false);
    setMessageSending(false);
  }, [orderId, fetchMessages]);

  async function handleSendMessage() {
    setMessageSending(true);
    try {
      const response = await axios.post(
        apiLink + "/send-message",
        {
          credentialsToken: credentials,
          message: messageText,
          orderId: orderId,
          contentType: "str",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFetchMessages(true);
      setMessageText("");
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "POPUP", message: err.response.data.message })
      );
    }

    setMessageSending(false);
  }

  useEffect(() => {
    if (fetchMessages) {
      getMessages();
    }
  }, [getMessages, fetchMessages]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <section className="w-full h-screen z-20 fixed top-0 left-0 box-border">
      <div className="w-full h-screen absolute z-30 flex justify-center items-center">
        <article className="w-[97%] sm:w-[28em] h-[40em] p-2 border-4 border-border-grey rounded-3xl bg-site-lighter-grey flex flex-col gap-2 justify-between">
          <div className="flex justify-center py-2 w-full border border-border-grey rounded-full shadow-lg relative">
            <button
              className="absolute left-4"
              onClick={() => {
                setChatOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faClose as IconDefinition} />
            </button>
            <h2 className="text-center md:text-lg font-bold">{userName}</h2>
          </div>

          {getMessagesError.error ? (
            <InModalErroDisplay
              message={getMessagesError.errorMessage}
              func={() => {
                setFetchMessages(true);
                setGetMessagesError((prev) => {
                  return { ...prev, error: false, errorMessage: "" };
                });
              }}
            />
          ) : (
            <>
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar border border-border-grey p-2 rounded-3xl">
                {/* <Message id="1" message="Hello. This is a test" userId="2" />
            <Message id="2" message="Hello. This is also a test" userId="2" />
            <Message id="3" message="Hello. This is also a test" userId="2" />
            <Message
              id="4"
              message="Hello. This is also an admin message test"
              userId="1"
            />
            <Message
              id="5"
              message="Hello. This is also an admin message test"
              userId="1"
            /> */}
                {messages.map((item) => (
                  <Message key={item.id} {...item} />
                ))}
              </div>

              <form
                className="w-full py-2 flex"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  disabled={messageSending}
                  type="text"
                  placeholder="Enter message..."
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                  }}
                  className="bg-site-dark-grey border border-border-grey w-4/5 py-2 px-4 outline-none rounded-l-full"
                />
                <button
                  disabled={messageSending}
                  className={`${
                    messageSending
                      ? "bg-site-transparent-orange"
                      : "bg-site-orange hover:bg-site-orange-hover"
                  }  w-1/5 rounded-r-full`}
                  onClick={handleSendMessage}
                >
                  {messageSending ? "... " : "Send"}
                </button>
              </form>
            </>
          )}
        </article>
      </div>
      <div className="w-full h-screen top-0 left-0 z-20 bg-black opacity-70" />
    </section>
  );
}

interface ChatboxProps {
  userName: string;
  orderId: string;
  setChatOpen: Dispatch<SetStateAction<boolean>>;
}

export default Chatbox;
