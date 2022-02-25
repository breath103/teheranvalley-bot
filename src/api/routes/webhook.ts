import { Namespace, Route } from "@serverless-seoul/corgi";
import { telegramBot, WebhookUpdatePayload } from "../../services/telegram";
import { getChannel } from "../../services/youtube";

export const route = new Namespace(
  "/webhook", {}, {
    children: [
      Route.POST(
        "/telegram", {
          desc: "receive telegram webhook",
          operationId: "postTelegramWebhookUpdate",
        }, {}, async function () {
          const body = this.bodyJSON as WebhookUpdatePayload;

          if ("message" in body) {
            if ("text" in body.message && "entities" in body.message) {
              const entities = body.message.entities;
              const text = body.message.text;
              if (entities?.length === 1 && entities[0].type === "bot_command") {
                const commnad = text.slice(entities[0].offset, entities[0].offset + entities[0].length);
                console.log("command", commnad);
                if (commnad.split("@")[0] === "/subscribers") {
                  const channel = await getChannel();
                  await telegramBot.telegram.sendMessage(body.message.chat.id, "채널 인원: " + Number(channel.statistics!.subscriberCount).toLocaleString());
                }
              }  
            }
          }

          console.log(JSON.stringify(body, null, 2));
          return this.json({ success: true }, 200);
        }),
    ],
  },
);
