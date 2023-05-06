import { Title } from "../../components/designSystem/Title"
import { PageContainer, PageTemplate } from "../../components/layout"
import { randomImage } from "../../utils/constants"
import HeaderBanner from "./components/HeaderBanner"

export default function LandingPage() {
  return (
    <PageTemplate>
      <PageContainer className="pt-24">
        <HeaderBanner />
        <article className="flex flex-wrap justify-center w-full lg:h-1/3 h-full pt-8 px-6">
          <div className="lg:w-96 w-full md:pt-0 pt-4 self-start">
            <Title
              {...{
                titleType: "h6",
                title: "Header Text",
                variant: "boldfont",
                className: "text-theme-button",
              }}
            />
            <p className="w-full my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae augue vel justo iaculis elementum ut at mi. Proin id
              efficitur elit, id tristique magna. Integer.
            </p>
          </div>
          <div className="lg:w-2/6 w-full h-[700px] mx-8">
            <img
              width={300}
              height={300}
              draggable="false"
              alt="next"
              src={`${randomImage}?random=1`}
              className="object-cover object-center w-full h-full bg-transparent"
            />
          </div>
          <div className="lg:w-96 w-full md:pt-0 pt-4 self-end">
            <Title
              {...{
                titleType: "h6",
                title: "Header Text",
                variant: "boldfont",
                className: "text-theme-button",
              }}
            />
            <p className="w-full my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae augue vel justo iaculis elementum ut at mi. Proin id
              efficitur elit, id tristique magna. Integer.
            </p>
          </div>
        </article>
      </PageContainer>
    </PageTemplate>
  )
}
