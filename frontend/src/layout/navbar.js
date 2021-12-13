import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Switch, Dropdown } from "antd";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

const ImgIcon = ({ src, width, isDarkTheme }) => {
  return (
    <img
      alt={"Navigation Icon"}
      style={{
        filter: isDarkTheme ? "brightness(0) invert(1)" : "none",
      }}
      src={src}
      width={width || 30}
    />
  );
};

const Navbar = ({
  removeUser,
  location,
  switchTheme,
  isDarkTheme,
  user,
  ...rest
}) => {

  const _routing = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/products",
      name: "Products",
    },
    {
      link: "/batches",
      name: "Batches",
    },
  ];

  const dropdownMenu = (
    <Menu>
      <Menu.Item
        key="1"
      >
        Settings
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={removeUser}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu mode="horizontal" 
    // selectedKeys={location.pathname}
    >
      {_routing.map(({ link, name }, i) => (
        <Menu.Item key={link}>
          <Link to={link}>
            <span className="nav__icon-container">
              <span style={{ marginLeft: 5 }}>{name}</span>
            </span>
          </Link>
        </Menu.Item>
      ))}

      <Menu.Item style={{ float: "right" }}>
        <Dropdown overlay={dropdownMenu} trigger={["click", "hover"]}>
          <Button className="ant-dropdown-link" type="text">
            <UserOutlined size="large" />
            {user?.name}
          </Button>
        </Dropdown>
      </Menu.Item>

      <Menu.Item style={{ float: "right" }}>
        <Switch
          onChange={switchTheme}
          checked={!isDarkTheme}
        />
      </Menu.Item>
    </Menu>
  );
};

// export default connect(mapState, null)((Navbar));
export default Navbar