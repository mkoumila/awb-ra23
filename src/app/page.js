import { sliderData } from "./data";
import { VerticalSlider } from "./components/VerticalSlide";

export default function Page() {
  return (
    <VerticalSlider data={sliderData} />
  );
}
