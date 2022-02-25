import { Telegraf } from "telegraf";
import * as token from "./telegram_key.json";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export const telegramBot = new Telegraf(token);
export type WebhookUpdatePayload = Awaited<ReturnType<typeof telegramBot.telegram.getUpdates>>[0];

