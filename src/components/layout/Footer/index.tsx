import { FC } from "react"

import { Banner } from ".."
import BackgroundImage from "../../../components/common/BackgroundImage"
import { Button } from "../../../components/common/Button"
import { Title } from "../../../components/designSystem/Title"

const Footer: FC = () => {
  return (
    <footer className="absolute w-full mt-auto bg-theme-bg-dark border-t pt-4">
      <div className="h-1/6">
        <div className="flex items-center lg:justify-between justify-center flex-wrap px-2">
          <Banner
            {...{
              id: "topFooter",
            }}
          >
            <div className="flex relative items-center w-full lg:px-20 md:space-x-16">
              <BackgroundImage className="lg:relative absolute -top-32 lg:h-[690px] lg:w-11/12 w-96 h-96 bg-theme-image-light lg:z-10" />
              <div className="flex flex-col text-left w-full z-20 px-2">
                <Title
                  {...{
                    titleType: "h1",
                    variant: "boldfont",
                    title: "Lorem ipsum dolor sit consectetur",
                    className: "text-theme-button md:w-4/5 w-full",
                  }}
                />
                <Title
                  {...{
                    titleType: "h6",
                    title:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rutrum augue est, vitae sollicitudin neque facilisis.",
                    className:
                      "text-theme-button lg:text-theme-text md:my-6 my-2 md:w-2/3",
                  }}
                />

                <div className="flex">
                  <Button
                    {...{
                      type: "button",
                      text: "Call to Action",
                    }}
                  />
                </div>
              </div>
            </div>
          </Banner>
        </div>
      </div>
    </footer>
  )
}

export default Footer
