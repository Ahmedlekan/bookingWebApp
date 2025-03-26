import { Neighborhood } from "./NeighborhoodGrid";
import { Link } from "react-router-dom";


type CardProps = Neighborhood & {
    height?: string;
  };
  
 export default function NeighborhoodCard({ title, properties, image, height }: CardProps) {
    return (
      <Link to="/search">
        <div
          className={`relative rounded-lg overflow-hidden shadow-md group ${
            height ?? "h-[210px] font-body"
          }`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />
          <div className="absolute top-4 left-4 text-white text-left z-10">
            <p className="text-sm font-medium">{properties} Properties</p>
            <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          </div>
        </div>
      </Link>

    );
  }
  