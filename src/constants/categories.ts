import AccessibleIcon from "@/components/CategoryTile/icons/AccessibleIcon";
import InspirationIcon from "@/components/CategoryTile/icons/InspirationIcon";
import InterpretationIcon from "@/components/CategoryTile/icons/InterpretationIcon";
import KnowledgeIcon from "@/components/CategoryTile/icons/KnowledgeIcon";
import { Category } from "@/types/category";

export const categories: Category[] = [
  {
    id: "knowledge",
    bgImagePath: "/images/categories/catKnowledgeBg.png",
    name: "wiedza",
    icon: KnowledgeIcon,
    tileColor: "#444E8D",
    useWhiteText: true,
  },
  {
    id: "inspiration",
    bgImagePath: "/images/categories/catInspirationBg.png",
    name: "inspiracje",
    icon: InspirationIcon,
    tileColor: "#FFBF42",
  },
  {
    id: "interpretation",
    bgImagePath: "/images/categories/catInterpretationBg.png",
    name: "interpretacje",
    icon: InterpretationIcon,
    tileColor: "#D94F4F",
    useWhiteText: true,
  },
  {
    id: "accessible",
    bgImagePath: "/images/categories/catAccessibleBg.png",
    name: "dostępne",
    icon: AccessibleIcon,
    tileColor: "#82E49A",
  },
];
