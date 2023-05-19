import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getLgbtratio, getStops } from '../../API';
import mapboxgl from 'mapbox-gl';

const Chart1 = () => {
  //const [selectedPoint, setSelectedPoint] = useState({ name: '', value: '' });
  //const [data, setData] = useState([]);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVmZW5neDEiLCJhIjoiY2xocWI3ZHE2MmQwdjNkcDAyNGRmd2R1NiJ9.jwoEIy9ZhNrwL9eqUiVCOQ';

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/yufengx1/clhqbn6y600mx01r86e7o00y1',
      center: [145, -36], // 调整地图中心坐标
      zoom: 6, 
      attributionControl: false,
      pitch: 0,
      bearing: 0,
    });
    
    const bounds = [
      [140, -40], // VIC 左下角坐标
      [155, -28], // NSW 右上角坐标
    ];
    map.fitBounds(bounds, { padding: 20 });

    map.on('style.load', () => {
      // 从API获取数据
      getStops().then((res) => {
        const data = res.data.map(({ coordinates, count }) => ({
          coordinates: JSON.parse(coordinates),
          count: parseInt(count),
        }));

        // 创建数据源
        const geojson = {
          type: 'FeatureCollection',
          features: data.map(({ coordinates, count }) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [coordinates[1], coordinates[0]],
            },
            properties: {
              count: count,
              
            },
          })),
        };

        // 添加数据源
        map.addSource('dots', {
          type: 'geojson',
          data: geojson,
        });

        // 添加图层
        map.addLayer({
          id: 'dots-layer',
          type: 'circle',
          source: 'dots',
          paint: {
            'circle-radius': {
              property: 'count',
              type: 'exponential',
              stops: [
                [0, 5],
                [1000, 12],
              ],
            },
            'circle-color': {
              property: 'count',
              type: 'exponential',
              stops: [
                [0, '#4455E6'], // 自定义蓝色
                [200, '#EE2626'], // 自定义红色
              ],
            },
            'circle-opacity': 0.7,
          },
        });
      });
    });
    // 清理地图实例
    return () => {
      map.remove();
    };
    
  }, []);

  // chart
  // const chartRef1 = useRef(null);
  // const [data1, setData1] = useState(null);

  // useEffect(() => {
  //   if (!chartRef1.current || !data1) {
  //     return;
  //   }

  //   const keys1 = []; // 存储 key 的数组
  //   const values1 = []; // 存储 value 的数组

  //   // 提取 key 和 value 并存储到数组中
  //   for (const key in data1) {
  //     if (Object.hasOwnProperty.call(data, key)) {
  //       const value = data[key];
  //       keys.push(key);
  //       values.push(value);
  //     }
  //   }

  //   console.log("Keys:", keys);
  //   console.log("Values:", values);

  //   const chart = echarts.init(chartRef.current);
  //   const option = {
  //     xAxis: {
  //       type: 'category',
  //       data: keys,
  //     },
  //     yAxis: {
  //       type: 'value',
  //     },
  //     series: [
  //       {
  //         data: values,
  //         type: 'bar',
  //       },
  //     ],
  //   };

  //   chart.setOption(option);

  //   return () => {
  //     chart.dispose();
  //   };
  // }, [data]);

  // useEffect(() => {
  //   getLgbtratio().then((res) => {

  //     setData(res.same_sex_couple[0]);
  //     console.log(data)
  //   });
  // }, []);


  return (
    <div>
      <h1 style={{ position: 'relative', fontWeight: 400, fontSize: '38px', marginTop: '60px' }}>Charts</h1>
      <div style={{ marginBottom: '80px' }}></div> {/* 添加空白区域 */}
      <h2 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', fontWeight: 400 }}>Density Plot of VIC & NSW Stops</h2>
      <div id="map-container" style={{ width: '100%', height: '800px' }}></div>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
      <h2 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', fontWeight: 400 }}>Chart</h2>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
    </div>
  );
};

export default Chart1;
