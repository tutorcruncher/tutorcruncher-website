import { Action } from "@/components/ui/action";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

export const HeroActions = () => (
  <>
    <Action href="/book-a-call" variant="outline">
      Book a product demo
    </Action>
    <TrackingLink
      url="https://app.tutorcruncher.com/start/1/"
      text="Start a free trial"
      variant="solid"
    />
  </>
);
