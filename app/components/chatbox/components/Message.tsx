import { MessageType } from "@types";

function Message({ id, message, userId }: MessageType) {
  const adminID = "217175469";
  return (
    <article
      className={`w-full flex ${
        userId === adminID ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`p-2 ${
          userId !== adminID
            ? "bg-site-transparent-green"
            : "bg-site-transparent-orange"
        } rounded-3xl w-4/5`}
      >
        {message}
      </p>
    </article>
  );
}

export default Message;
