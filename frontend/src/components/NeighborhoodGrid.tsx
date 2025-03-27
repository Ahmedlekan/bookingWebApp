import NeighborhoodCard from "./NeighborhoodCard";
import grid1 from "../assets/Grid-1.jpg"
import grid2 from "../assets/Grid-2.jpg"
import grid3 from "../assets/Grid-3.jpg"
import grid4 from "../assets/Grid-4.jpg"
import grid5 from "../assets/Grid-5.jpg"
import grid6 from "../assets/Grid-6.jpg"
import grid7 from "../assets/Grid-7.jpg"

export type Neighborhood = {
    id: number;
    title: string;
    properties: number;
    image: string;
  };
  
  const neighborhoods: Neighborhood[] = [
    { id: 1, title: "Vancouver", properties: 10, image: grid1 },             
    { id: 2, title: "Montreal Quebec", properties: 11, image: grid2 }, 
    { id: 3, title: "Apartment", properties: 30, image: grid3 },       
    { id: 4, title: "Edmilton", properties: 10, image: grid4 },               
    { id: 5, title: "Toronto", properties: 5, image: grid5 },                
    { id: 6, title: "Ottawa", properties: 14, image: grid6 },          
    { id: 7, title: "Quebec city", properties: 13, image: grid7 },     
  ];
  
  export default function NeighborhoodGrid() {
    return (
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
          Explore The Neighborhood
        </h2>
        <p className="text-gray-500 text-lg font-body mb-12 max-w-xl mx-auto">
          There are different property options to choose from,
          each serving a purpose to help you build a finished site.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl
            mx-auto">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <NeighborhoodCard {...neighborhoods[0]} height="h-[250px]" />
            <NeighborhoodCard {...neighborhoods[1]} height="h-[400px]" />
          </div>
  
          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <NeighborhoodCard {...neighborhoods[2]} height="h-[400px]" />
            <NeighborhoodCard {...neighborhoods[3]} height="h-[250px]" />
          </div>
  
          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <NeighborhoodCard {...neighborhoods[4]} />
            <NeighborhoodCard {...neighborhoods[5]} />
            <NeighborhoodCard {...neighborhoods[6]} />
          </div>
        </div>
      </section>
    );
  }