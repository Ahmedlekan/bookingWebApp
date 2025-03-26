import { FaUsers, FaChartPie, FaChartLine, FaHandshake, FaTv,
  FaBalanceScale } from "react-icons/fa";

type Service = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const services: Service[] = [
  {
    title: "Property Management",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaUsers size={32} />,
  },
  {
    title: "Capital Improvements",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaChartPie size={32} />,
  },
  {
    title: "Financial Reporting",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaChartLine size={32} />,
  },
  {
    title: "Business Development",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaHandshake size={32} />,
  },
  {
    title: "Finance Real Estate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaTv size={32} />,
  },
  {
    title: "Recover Asset Value",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    icon: <FaBalanceScale size={32} />,
  },
];

export default function ServicesSection() {
  return (
    <section className="pb-16 px-6 bg-white text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12 text-left">
        {services.map((service, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-black">{service.icon}</div>
            <div>
              <h4 className="text-xl font-display font-semibold mb-1">
                {service.title}
              </h4>
              <p className="text-gray-500 font-body text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
