import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
// import { connect } from "react-redux";

// const ImgIcon = ({ src, width, isDarkTheme }) => {
//   return (
//     <img
//       alt={"Navigation Icon"}
//       style={{
//         filter: isDarkTheme ? "brightness(0) invert(1)" : "none",
//       }}
//       src={src}
//       width={width || 30}
//     />
//   );
// };

const Navbar = ({
  location,
}) => {

  const _routing = [
    // {
    //   link: "/",
    //   name: "Home",
    // },
    {
      link: "/products",
      name: "Products",
    },
    {
      link: "/batches",
      name: "Batches",
    },
  ];


  return (
    <Menu mode="horizontal"
    // selectedKeys={location.pathname}
    >


      <Menu.Item>
        <Link to={'/'}>
          <b style={{ color: "darkgreen", fontSize: 20 }}>peppo</b>
        </Link>
      </Menu.Item>
      {_routing.map(({ link, name }, i) => (
        <Menu.Item key={link}>
          <Link to={link}>
            <span className="nav__icon-container">
              <span style={{ marginLeft: 5 }}>{name}</span>
            </span>
          </Link>
        </Menu.Item>
      ))}


    </Menu>
  );
};

export default Navbar