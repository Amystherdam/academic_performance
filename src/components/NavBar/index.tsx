import { useNavigate } from "react-router";

interface INavBar {
  paths: Array<{ label: string; path: string }>;
}

export default function NavBar(props: INavBar) {
  const { paths } = props;
  const navigate = useNavigate();

  return (
    <nav className="border-gray-200 bg-[#80297d]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#80297d] md:dark:bg-[#80297d] dark:border-gray-700">
            {paths.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                className="block py-2 px-3 md:p-0 text-white"
              >
                <span className="mt-2">{item.label}</span>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
