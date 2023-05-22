import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getTransSenti, getStops } from '../../API';
import mapboxgl from 'mapbox-gl';

const Chart1 = () => {
  
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
  const chartRef1 = useRef(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    if (!chartRef1.current || !data1) {
      return;
    }

    const chart1 = echarts.init(chartRef1.current);
    const option1 = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data1,
        },
      ],
    };

    chart1.setOption(option1);

    return () => {
      chart1.dispose();
    };
  }, [data1]);

  useEffect(() => {
    getTransSenti().then((res) => {
      const formattedData = [
        { value: res.data[0].pos, name: 'Positive' },
        { value: res.data[0].neu, name: 'Neutral' },
        { value: res.data[0].neg, name: 'Negative' },
      ];

      setData1(formattedData);
    });
  }, []);



  return (
    <div>
      <div style={{ marginBottom: '80px' }}></div> {/* 添加空白区域 */}
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', fontWeight: 400 }}>Chart 1: Density Plot of NSW & VIC Stops</h1>
      <h2 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', fontWeight: 400 }}>
        This map shows the distribution and density of public stops in New South Wales and Victoria.</h2>
      <div id="map-container" style={{ width: '100%', height: '800px' }}></div>
      <div style={{ marginBottom: '120px' }}></div> {/* 添加空白区域 */}
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', fontWeight: 400 }}>
      Chart 2: Ratio of sentiments all over Australia</h1>
      <div ref={chartRef1} style={{ width: '60%', height: 600 }}></div>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
    </div>
  );
};

export default Chart1;



