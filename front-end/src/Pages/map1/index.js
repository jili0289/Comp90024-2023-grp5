// import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
//import { getInventory } from "../../API";
import mapboxgl from 'mapbox-gl';

const data = [
  // GeoJSON 数据，包含多边形地区和相应的数值
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [140.9619, -39.18253],
        [140.9619, -39.28442],
        [141.18216, -39.28442],
        [141.18216, -39.18253],
        [140.9619, -39.18253]
      ]],
    },
    properties: {
      value: 100, // 数值
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [141.00292, -29.17716],
        [141.00292, -37.50533],
        [154.63466, -37.50533],
        [154.63466, -29.17716],
        [141.00292, -29.17716]
      ]],
    },
    properties: {
      value: 20, // 数值
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [112.92109, -13.76356],
        [112.92109, -35.02347],
        [129.00297, -35.02347],
        [129.00297, -13.76356],
        [112.92109, -13.76356]
      ]],
    },
    properties: {
      value: 20, // 数值
    },
  },
  // 其他多边形地区数据...
];

function Map1() {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVmZW5neDEiLCJhIjoiY2xocWI3ZHE2MmQwdjNkcDAyNGRmd2R1NiJ9.jwoEIy9ZhNrwL9eqUiVCOQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yufengx1/clhqbn6y600mx01r86e7o00y1?attribution=false',
      center: [133.7751, -25.2744],
      zoom: 20,
      attributionControl: false,
      pitch: 0, // 设置俯仰角为0，使地图以2D视图展示
      bearing: 0, // 设置方位角为0，使地图以正北方向展示
    });
    const bounds = [
      [112.5, -44], 
      [153.5, -10], 
    ];
    map.fitBounds(bounds, { padding: 20 });


    map.on('load', () => {
      map.addSource('heatmap-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data,
        },
      });

      map.addLayer({
        id: 'heatmap-layer',
        type: 'fill',
        source: 'heatmap-source',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'value'],
            0, 'blue', // 最小值时的颜色
            100, 'red', // 最大值时的颜色
          ],
          'fill-opacity': 0.8,
        },
      });
    });

    return () => {
      // 在组件卸载时清理地图实例
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1>Map 1</h1>
      <div id="map" style={{ width: '100%', height: '1000px' }}></div>
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
