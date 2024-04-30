import { WebhookEvents } from '../contracts/enums/webhook-events.enum';

export class Webhook {
  event: WebhookEvents;
  url: string;
}
