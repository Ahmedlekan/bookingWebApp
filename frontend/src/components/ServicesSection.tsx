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
    description: "We provide seamless property management solutions, ensuring optimal maintenance, tenant satisfaction, and maximum returns on your investment.",
    icon: <FaUsers size={32} />,
  },
  {
    title: "Capital Improvements",
    description: "Enhance the value of your property with strategic upgrades and renovations designed to increase asset longevity and market appeal.",
    icon: <FaChartPie size={32} />,
  },
  {
    title: "Financial Reporting",
    description: "Gain clear insights with detailed and transparent financial reporting, helping you make informed decisions to maximize profitability.",
    icon: <FaChartLine size={32} />,
  },
  {
    title: "Business Development",
    description: "Drive growth and expand your reach with tailored strategies that foster business development and increase your market footprint.",
    icon: <FaHandshake size={32} />,
  },
  {
    title: "Finance Real Estate",
    description: "We offer expert guidance in securing financing and managing real estate investments to ensure sustainable growth and long-term success.",
    icon: <FaTv size={32} />,
  },
  {
    title: "Recover Asset Value",
    description: "Our proven strategies help restore and recover asset value through proactive management and value-add initiatives.",
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
              <p className="text-gray-500 font-body text-base ">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
