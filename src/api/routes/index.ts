import { Routes } from "@serverless-seoul/corgi";

import { route as HealthRoute } from "./health";
import { route as WebhookRoute } from "./webhook";

export const routes: Routes = [
  HealthRoute,
  WebhookRoute,
];
