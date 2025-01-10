import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Carousel,
  Button,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";

const CardPortfolio1 = ({ portfolio }) => {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        floated={false}
        color="gray"
        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
      >
        <Carousel
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="sm"
              onClick={handlePrev}
              className="!absolute top-2/4 left-1 rounded-full -translate-y-2/4"
            >
              <IoIosArrowBack className="w-4 h-4" />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="sm"
              onClick={handleNext}
              className="!absolute top-2/4 right-1 rounded-full -translate-y-2/4"
            >
              <IoIosArrowBack className="w-4 h-4 rotate-180" />
            </IconButton>
          )}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-0.5 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-4 bg-white" : "w-1 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {portfolio.images.map((image, index) => (
            <img
              key={index}
              loading="lazy"
              src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
              alt={"alternatif"}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
      </CardHeader>
      <CardBody className="py-0 px-1">
        <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
          {portfolio.name}
        </Typography>
        <Typography
          variant="small"
          className="font-normal text-blue-gray-500 !line-clamp-3 leading-6 mb-4"
        >
          {portfolio?.paragraphs[0]}
        </Typography>
        <div className="flex gap-2 w-full flex-wrap">
          {portfolio?.tech.slice(0, 5).map((value, index) => (
            <Chip
              size="sm"
              className="text-[10px]"
              key={index}
              color="blue-gray"
              variant="ghost"
              value={value}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
        <Link to={`/portfolio-admin/${portfolio?._id}`}>
          <Button variant="outlined" size="sm">
            view project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

CardPortfolio1.propTypes = {
  portfolio: propTypes.object,
};

export default CardPortfolio1;
