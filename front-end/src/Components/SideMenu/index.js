import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.css";

function getItem(
  label,
  key,
  icon,
  children,
  type
) {
  return {
    key: key,
    icon: icon,
    children: children,
    label: label,
    type: type
  };
}

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          getItem('Scenario One', 'sub1', <AppstoreOutlined />, [
            getItem('Option 1', "/map1"),
            getItem('Option 2', "/"),
            getItem('Option 3', "/")
          ]),
          
          getItem('Scenario Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 4', "/customers"),
            getItem('Option 5', "/customers"),
            getItem('Option 6', "/customers")
            // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')])
          ]),

          getItem('Scenario Three', 'sub3', <AppstoreOutlined />, [
            getItem('Option 7', "/orders"),
            getItem('Option 8', "/orders"),
            getItem('Option 9', "/orders")
            // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')])
          ]),
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
