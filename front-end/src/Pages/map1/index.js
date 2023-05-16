// import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
//import { getInventory } from "../../API";
import mapboxgl from 'mapbox-gl';


function Map1() {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVmZW5neDEiLCJhIjoiY2xocWI3ZHE2MmQwdjNkcDAyNGRmd2R1NiJ9.jwoEIy9ZhNrwL9eqUiVCOQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yufengx1/clhqbn6y600mx01r86e7o00y1',
      center: [144.9631, -37.8136],
      zoom: 10,
    });

    // 在这里可以添加地图的其他配置和功能

    return () => {
      // 在组件卸载时清理地图实例
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1>Map 1</h1>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default Map1;

// function Map1() {
//   const [loading, setLoading] = useState(false);
//   const [dataSource, setDataSource] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     getInventory().then((res) => {
//       setDataSource(res.products);
//       setLoading(false);
//     });
//   }, []);

//   return (

//     // <Space size={20} direction="vertical">
//     //   <Typography.Title level={4}>Inventory</Typography.Title>
//     //   <Table
//     //     loading={loading}
//     //     columns={[
//     //       {
//     //         title: "Thumbnail",
//     //         dataIndex: "thumbnail",
//     //         render: (link) => {
//     //           return <Avatar src={link} />;
//     //         },
//     //       },
//     //       {
//     //         title: "Title",
//     //         dataIndex: "title",
//     //       },
//     //       {
//     //         title: "Price",
//     //         dataIndex: "price",
//     //         render: (value) => <span>${value}</span>,
//     //       },
//     //       {
//     //         title: "Rating",
//     //         dataIndex: "rating",
//     //         render: (rating) => {
//     //           return <Rate value={rating} allowHalf disabled />;
//     //         },
//     //       },
//     //       {
//     //         title: "Stock",
//     //         dataIndex: "stock",
//     //       },

//     //       {
//     //         title: "Brand",
//     //         dataIndex: "brand",
//     //       },
//     //       {
//     //         title: "Category",
//     //         dataIndex: "category",
//     //       },
//     //     ]}
//     //     dataSource={dataSource}
//     //     pagination={{
//     //       pageSize: 5,
//     //     }}
//     //   ></Table>
//     // </Space>
//   );
// }
// export default Map1;
