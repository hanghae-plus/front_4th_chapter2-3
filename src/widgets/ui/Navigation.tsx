const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <a
            href="#"
            className="hover:underline"
          >
            홈
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline"
          >
            대시보드
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline"
          >
            설정
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
