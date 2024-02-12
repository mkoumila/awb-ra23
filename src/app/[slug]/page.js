import { VerticalSlider } from "../components/VerticalSlide";
import { sliderData } from "../data";

export default function Page({ params }) {
  const { slug } = params;

  return <VerticalSlider data={sliderData} slug={slug} />;
}

export async function generateStaticParams() {
  return sliderData.map((post) => ({
    slug: post.id,
  }));
}
