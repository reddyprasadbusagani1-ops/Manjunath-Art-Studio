import a1 from "@/assets/artwork-01.jpg.asset.json";
import a2 from "@/assets/artwork-02.jpg.asset.json";
import a3 from "@/assets/artwork-03.jpg.asset.json";
import a4 from "@/assets/artwork-04.jpg.asset.json";
import a5 from "@/assets/artwork-05.png.asset.json";
import a6 from "@/assets/artwork-06.png.asset.json";
import a7 from "@/assets/artwork-07.png.asset.json";
import a8 from "@/assets/artwork-08.png.asset.json";
import type { ArtworkImage } from "./types";

const img = (n: string, src: string, en: string, te: string): ArtworkImage => ({
  id: `img-${n}`,
  artworkId: `artwork-${n}`,
  src,
  alt: { en, te },
  isPrimary: true,
  sortOrder: 1,
});

export const ARTWORK_IMAGES: ArtworkImage[] = [
  img("01", a1.url, "Sri Rama Pattabhishekam", "శ్రీ రామ పట్టాభిషేకం"),
  img("02", a2.url, "Sri Krishna with Consorts", "దేవేరులతో శ్రీ కృష్ణుడు"),
  img("03", a3.url, "Kaliya Mardana Krishna", "కాళీయ మర్దన కృష్ణుడు"),
  img("04", a4.url, "Sri Vishnu on Garuda with Consorts", "గరుడ వాహనంపై శ్రీ విష్ణువు"),
  img("05", a5.url, "Nandi – Traditional Line Art", "నంది – సాంప్రదాయ రేఖా చిత్రం"),
  img("06", a6.url, "Peacock – Traditional Colorful Art", "నెమలి – సాంప్రదాయ రంగుల కళ"),
  img("07", a7.url, "Peacock – Traditional Pencil Line Art", "నెమలి – సాంప్రదాయ పెన్సిల్ రేఖా చిత్రం"),
  img("08", a8.url, "Lord Ganesha – Traditional Devotional Art", "శ్రీ గణేశుడు – సాంప్రదాయ భక్తి కళ"),
];
