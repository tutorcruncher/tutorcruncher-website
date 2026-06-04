import { ReactNode } from "react";

import { ImageField } from "@prismicio/types";
import { BackgroundColour } from "@/types/backgroundColor";

interface Stat {
  image: ImageField;
  percent: string;
  description: string;
  source?: string;
}

export interface StatsProps {
  heading: ReactNode;
  background?: BackgroundColour;
  stats: Stat[];
}
