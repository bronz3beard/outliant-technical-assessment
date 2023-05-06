import { MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

import BackgroundImage from "../../../components/common/BackgroundImage"
import { Button } from "../../../components/common/Button"
import { Title } from "../../../components/designSystem/Title"
import { Banner } from "../../../components/layout"

const HeaderBanner = () => {
  const navigate = useNavigate()

  const handleNavToWorkSpace = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate("/products")
  }

  return (
    <Banner
      {...{
        id: "topBanner",
        className:
          "relative flex items-center justify-start lg:h-[35rem] mb-24",
      }}
    >
      <div className="flex relative h-96 w-full px-20">
        <div className="flex flex-col justify-start lg:items-start text-left md:w-2/4 w-full z-20 px-2 self-start">
          <Title
            {...{
              titleType: "h1",
              variant: "boldfont",
              title: "Lorem ipsum dolor sit amet, consectetur.",
              className: "text-theme-button md:w-2/3",
            }}
          />
          <Title
            {...{
              titleType: "h6",
              title:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rutrum augue est, vitae sollicitudin neque facilisis.",
              className:
                "text-theme-button lg:text-theme-text  md:my-6 my-4 md:w-2/3",
            }}
          />

          <div className="flex space-x-2 lg:mt-0 mt-10">
            <Button
              {...{
                type: "button",
                text: "Call to Action",
              }}
            />
            <Button
              {...{
                type: "button",
                variant: "secondary",
                text: "See Workspace",
                onClick: handleNavToWorkSpace,
              }}
            />
          </div>
        </div>
        <BackgroundImage className="absolute -top-16 md:right-24 bg-theme-image-dark lg:h-64 lg:w-64 w-96 h-full lg:z-20 z-0" />
        <BackgroundImage className="absolute top-0 md:right-44 right-16 lg:h-[450px] lg:w-[450px] w-96 h-full bg-theme-image-light lg:z-10 -z-1" />
      </div>
    </Banner>
  )
}

export default HeaderBanner
