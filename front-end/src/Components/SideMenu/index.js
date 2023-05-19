import {
  AppstoreOutlined,
  CarOutlined,
  TeamOutlined,
  BankOutlined,
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
          getItem('Scenario One', 'sub1', <CarOutlined />, [
            getItem('Twitter', "/mapt1"),
            getItem('Mastodon', "/mapm1"),
            getItem('Charts', "/chart1")
          ]),
          
          getItem('Scenario Two', 'sub2', <TeamOutlined />, [
            getItem('Twitter', "/mapt2"),
            getItem('Mastodon', "/mapm2"),
            getItem('Charts', "/chart2")
          ]),

          getItem('Scenario Three', 'sub3', <BankOutlined />, [
            getItem('Twitter', "/mapt3"),
            getItem('Mastodon', "/mapm3"),
            getItem('Charts', "/chart3")
          ]),      
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
