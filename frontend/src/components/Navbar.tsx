import { useLocation, useNavigate } from "react-router-dom";
interface NavLinkProps {
  to: string;
  currentPath: string;
  icon: string;
  text: string;
  admin?: boolean;
}

interface IconsList {
  [key: string]: JSX.Element;
}

const iconsList: IconsList = {
  surveillance: (
    <svg width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path d="m0 0h32v32h-32z" />

        <path d="m27 2v22h-3.154l2.7005856 6h-21.09317121l2.69958561-6h-3.153v-22zm-5.347 22h-11.307l-1.8 4h14.907zm3.347-20h-18v18h18zm-9 5c2.209139 0 4 1.790861 4 4s-1.790861 4-4 4-4-1.790861-4-4 1.790861-4 4-4zm0 2c-1.1045695 0-2 .8954305-2 2s.8954305 2 2 2 2-.8954305 2-2-.8954305-2-2-2z" fill="#000000" fill-rule="nonzero" />
      </g>
    </svg>
  ),
  overview: (
    <svg width="20px" height="20px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
};

export default function Navbar() {
  const location = useLocation();
  return (
    <aside className="sticky top-0 flex flex-col justify-end w-1/6 h-screen p-4 bg-cyan-50 text-primary md:bg-accent md:justify-between">
      <nav className="hidden space-y-3 md:block">
        <h1 className="font-bold">AIQUA</h1>
        <NavLink to="/" currentPath={location.pathname} icon="surveillance" text="Surveillance" />
        <NavLink to="/impact" currentPath={location.pathname} icon="overview" text="Management" />
      </nav>
    </aside>
  );
}

// Create a new NavLink component to manage styling based on the current route
function NavLink({ to, currentPath, icon, text }: NavLinkProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  const isActive = currentPath === to;

  const buttonClasses = `flex items-center w-full px-2 py-2 space-x-2 text-${isActive ? "primary bg-sky-200" : "foreground"} rounded-lg hover:bg-background active:bg-accent focus:outline-none focus:ring-1 focus:ring-primary-foreground focus:ring-offset-1`;

  return (
    <button className={buttonClasses} onClick={handleClick}>
      {iconsList[icon]}
      <span className={`text-sm font-medium`}>{text}</span>
    </button>
  );
}
