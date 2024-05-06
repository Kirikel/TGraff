import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="font-[interSimbold] border-solid border-0 border-b-[1px] border-[#EBECF2] text-[24px] pl-[40px] py-[16px]">
      <nav>
        <ul className="flex gap-[20px]">
          <li><Link to="/">user</Link></li>
          <li><Link to="/support">support</Link></li>
        </ul>
      </nav>
    </header>
  );
}
