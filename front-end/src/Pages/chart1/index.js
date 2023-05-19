import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getLgbtratio, getStops } from '../../API';
import mapboxgl from 'mapbox-gl';

const Chart1 = () => {
  //const [data, setData] = useState([]);
  const data = [[-38.062348, 145.456709], [-37.294952, 144.951708], [-37.295707, 144.952093], [-37.278118, 144.736607], [-37.27805, 144.736812], [-37.35009, 144.742812], [-37.350121, 144.743036], [-38.170348, 145.967875], [-36.927406, 144.711852], [-36.927469, 144.712299], [-36.124085, 144.751933], [-36.114285, 144.756112], [-35.643573, 144.131196], [-35.903637, 144.301115], [-35.956289, 144.368797], [-35.955983, 144.368796], [-36.028933, 144.516566], [-36.314382, 145.047526], [-36.394078, 145.361332], [-36.394571, 145.361143], [-36.383816, 145.406341], [-36.379839, 145.399466], [-36.3795, 145.399763], [-36.017252, 144.957807], [-36.397075, 144.980858], [-36.445715, 144.982588], [-36.445955, 144.982437], [-36.585667, 145.014727], [-38.187058, 146.001438], [-38.18627, 146.002019], [-38.203345, 146.062866], [-38.080692, 142.804774], [-38.203676, 146.063684], [-36.765928, 144.282104], [-36.735504, 144.132058], [-36.735432, 144.132442], [-36.601675, 143.941345], [-36.601447, 143.941264], [-36.574856, 143.867806], [-36.575308, 143.868201], [-36.418504, 143.612965], [-36.418108, 143.61364], [-36.268352, 143.350877], [-36.076936, 143.225765], [-35.853122, 143.177119], [-35.717984, 143.108102], [-35.638243, 142.998973], [-35.638184, 142.999086], [-35.50427, 142.849806], [-35.469785, 143.26744]];
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



    // // 获取数据
    // getStops().then((res) => {
    //   const stopsData = res.data;
    //   // console.log(stopsData);
    //   // const slicedData = stopsData.slice(0, 20);
    //   setData(stopsData);

      //const coordinates = stopsData.map(([lat, lng]) => [lng, lat]);
      const coordinates = data.map(([lat, lng]) => [lng, lat]);
      console.log(coordinates);

      const geojson = {
        type: 'FeatureCollection',
        features: coordinates.map((coordinates) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
        })),
      };
      console.log(geojson.features);

      map.on('load', () => {
        map.addSource('points', {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: 'points-layer',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-radius': 6,
            'circle-color': 'blue',
            'circle-opacity': 0.7,
          },
        });
      });
    //});

    // 清理地图实例
    return () => {
      map.remove();
    };
  }, []);


  // const chartRef = useRef(null);
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
      <h1>Charts</h1>
      <h2 style={{ marginBottom: '35px', marginTop: '40px' }}>Victoria & New South Wales stops</h2>
      <div id="map-container" style={{ width: '100%', height: '1000px' }}></div>
      <h2 style={{ marginBottom: '35px', marginTop: '40px' }}>chart of blabla</h2>
      
    </div>
  );
};

export default Chart1;
