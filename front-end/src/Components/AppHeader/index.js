import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, Space } from "antd";
import { useEffect, useState } from "react";
import "./AppHeader.css";
import { Link } from 'react-router-dom';

function AppHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);



  return (
    <div className="AppHeader">
      <Link to="/">
        <HomeOutlined />
      </Link>

      <h1 className="title">CCC Group 5 Homepage</h1>

      <Space>
        <Badge >
          <MailOutlined
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
      </Space>

      <Drawer
        title="Team Members"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <div className="TeamMembers">
            <div className="Name">Zixuan Cheng </div>
            <div className="Email"><a href="zixuacheng@student.unimelb.edu.au">zixuacheng@student.unimelb.edu.au</a></div>
            <div className="Name">Jiayun Huang </div>
            <div className="Email"><a href="jiayunh3@student.unimelb.edu.au">jiayunh3@student.unimelb.edu.au</a></div>
            <div className="Name">Jiayuan Li </div>
            <div className="Email"><a href="jiayuan6@student.unimelb.edu.au">jiayuan6@student.unimelb.edu.au</a></div>
            <div className="Name">Yufeng Xie </div>
            <div className="Email"><a href="yufengx1@student.unimelb.edu.au">yufengx1@student.unimelb.edu.au</a></div>
            <div className="Name">Chang Yu </div>
            <div className="Email"><a href="chyu3@student.unimelb.edu.au">chyu3@student.unimelb.edu.au</a></div>
        </div>

      </Drawer>
    </div>
  );
}
export default AppHeader;
