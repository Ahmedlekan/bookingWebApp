import { FaHotel, FaMapMarkedAlt, FaHandsHelping, FaAward } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
// import teamImage from "../assets/team.jpg"
import hotelImage from '../assets/los-angeles-11.jpg';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const stats = [
    { value: '10,000+', label: 'Properties Worldwide' },
    { value: '2M+', label: 'Happy Guests' },
    { value: '150+', label: 'Countries' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const features = [
    {
      icon: <FaHotel className="text-3xl text-lime-600" />,
      title: 'Curated Selection',
      description: 'Only the highest quality accommodations that meet our strict standards'
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl text-lime-600" />,
      title: 'Best Locations',
      description: 'Properties in prime locations with easy access to attractions'
    },
    {
      icon: <FaHandsHelping className="text-3xl text-lime-600" />,
      title: 'Personalized Service',
      description: 'Our travel experts help you find the perfect stay'
    },
    {
      icon: <FaAward className="text-3xl text-lime-600" />,
      title: 'Price Guarantee',
      description: 'We guarantee the best rates for all our properties'
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Hospitality industry veteran with 15+ years experience'
    },
    {
      name: 'Ahmed Fatiu',
      role: 'Software Developer',
      bio: 'Ensures seamless booking experiences for all guests'
    },
    {
      name: 'James Wilson',
      role: 'Customer Success',
      bio: 'Dedicated to solving any issues within minutes'
    },
  ];

  return (
    <div className="bg-white ">
      {/* Hero Section */}
      <div className="relative bg-lime-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            Our Story
        </h1>
          <p className="text-xl md:text-2xl max-w-3xl font-body mx-auto">
            Connecting travelers with exceptional stays since 2015
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src={hotelImage} 
              alt="Luxury hotel" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At <span className="font-semibold font-body text-lime-600">
                BookingEase</span>, we believe travel should be effortless
                and memorable. We're dedicated to providing a seamless booking
                experience with the widest selection of accommodations to suit
                every taste and budget.
            </p>
            <p className="text-lg text-gray-600 mb-8 font-body">
              What started as a small team passionate about travel has grown
              into a global platform helping millions discover their perfect
              stay each year.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-body">
              {stats.map((stat, index) => (
                <div key={index} className="bg-lime-50 p-4 rounded-lg
                    text-center">
                  <p className="text-2xl font-bold text-lime-700">
                    {stat.value}
                    </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
                Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
              We go above and beyond to make your travel experience exceptional
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 font-body">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl
                shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
            Meet Our Team
        </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
            Passionate professionals dedicated to your travel experience
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center font-body">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm
                overflow-hidden hover:shadow-md transition-shadow w-full md:w-80">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <GiEarthAmerica className="text-5xl text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                </h3>
                <p className="text-lime-600 font-medium mb-2">
                    {member.role}
                </p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lime-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 font-display">Ready to find your perfect stay?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-body">
            Join millions of travelers who trust us for their accommodation needs
          </p>
          <Link to="/search" className="bg-white text-lime-700 font-bold py-3 px-8
            rounded-lg hover:bg-gray-100 transition-colors font-body"
          
          >
            Explore Properties
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;