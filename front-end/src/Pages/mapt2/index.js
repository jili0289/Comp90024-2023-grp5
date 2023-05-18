// import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
//import { getInventory } from "../../API";
import mapboxgl from 'mapbox-gl';

// const data = [
//   // GeoJSON 数据，包含多边形地区和相应的数值
//   {
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [[
//         [140.9619, -39.18253],
//         [140.9619, -39.28442],
//         [141.18216, -39.28442],
//         [141.18216, -39.18253],
//         [140.9619, -39.18253]
//       ]],
//     },
//     properties: {
//       value: 100, // 数值
//     },
//   },
//   {
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [[
//         [141.00292, -29.17716],
//         [141.00292, -37.50533],
//         [154.63466, -37.50533],
//         [154.63466, -29.17716],
//         [141.00292, -29.17716]
//       ]],
//     },
//     properties: {
//       value: 20, // 数值
//     },
//   },
//   {
//     type: 'Feature',
//     geometry: {
//       type: 'Polygon',
//       coordinates: [[
//         [112.92109, -13.76356],
//         [112.92109, -35.02347],
//         [129.00297, -35.02347],
//         [129.00297, -13.76356],
//         [112.92109, -13.76356]
//       ]],
//     },
//     properties: {
//       value: 20, // 数值
//     },
//   },
//   // 其他多边形地区数据...
// ];

function Mapt2() {
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

    const dataPoints = [
      { name: 'Canberra', coordinates: [149.1287, -35.2820], value: 80 },
      { name: 'Sydney', coordinates: [151.2093, -33.8688], value: 120 },
      { name: 'Melbourne', coordinates: [144.9631, -37.8136], value: 150 },
      { name: 'Brisbane', coordinates: [153.0251, -27.4698], value: 90 },
      { name: 'Perth', coordinates: [115.8575, -31.9505], value: 1100 },
      { name: 'Adelaide', coordinates: [138.6007, -34.9285], value: 100 },
      { name: 'Darwin', coordinates: [130.8418, -12.4634], value: 70 },
      { name: 'Hobart', coordinates: [147.3250, -42.8821], value: 85 },
    ];
    
    const features = dataPoints.map(({ name, coordinates, value }) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates,
      },
      properties: {
        value: value,
        name: name,
      },
    }));
    
    // 添加点阵图层
    map.on('load', () => {
      // 创建数据源
      map.addSource('dots', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features,
          // features: [
          //   // 在这里添加你的数据点
          //   // 每个数据点都需要包含经纬度和数值大小信息
          //   // 例如：{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [longitude, latitude] }, "properties": { "value": 10 } }
          // ],
        },
      });

      // 添加图层
      map.addLayer({
        id: 'dots-layer',
        type: 'circle',
        source: 'dots',
        paint: {
          'circle-radius': {
            property: 'value',
            type: 'exponential',
            stops: [
              // 根据数值大小设置点的半径范围
              [0, 5],
              [100, 10],
            ],
          },
          'circle-color': {
            property: 'value',
            type: 'exponential',
            stops: [
              // 根据数值大小设置点的颜色范围
              [0, 'blue'],
              [100, 'red'],
            ],
          },
          'circle-opacity': 0.7,
        },
      });
    });
    
    // map.on('load', () => {
    //   map.addSource('heatmap-source', {
    //     type: 'geojson',
    //     data: {
    //       type: 'FeatureCollection',
    //       features: data,
    //     },
    //   });

    //   map.addLayer({
    //     id: 'heatmap-layer',
    //     type: 'fill',
    //     source: 'heatmap-source',
    //     paint: {
    //       'fill-color': [
    //         'interpolate',
    //         ['linear'],
    //         ['get', 'value'],
    //         0, 'blue', // 最小值时的颜色
    //         100, 'red', // 最大值时的颜色
    //       ],
    //       'fill-opacity': 0.8,
    //     },
    //   });
    // });

    return () => {
      // 在组件卸载时清理地图实例
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1>Twitter</h1>
      <div id="map" style={{ width: '100%', height: '1000px' }}></div>
    </div>
  );
}

export default Mapt2;
