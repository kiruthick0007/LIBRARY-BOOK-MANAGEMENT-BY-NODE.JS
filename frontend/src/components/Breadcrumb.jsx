import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatPathName = (path) => {
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 bg-white rounded-xl p-4 shadow-sm">
      <Link
        to="/"
        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
      >
        <FaHome className="mr-1" />
        <span className="font-medium">Home</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center space-x-2">
            <FaChevronRight className="text-gray-400 text-xs" />
            
            {isLast ? (
              <span className="text-indigo-600 font-semibold">
                {formatPathName(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                {formatPathName(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
