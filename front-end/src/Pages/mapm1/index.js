import { useEffect, useState } from "react";
import { getTransMast } from "../../API";
import mapboxgl from 'mapbox-gl';

function Mapm1() {
  const [selectedPoint, setSelectedPoint] = useState({ name: '', value: '' });
  const [isTextBoxVisible, setTextBoxVisibility] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVmZW5neDEiLCJhIjoiY2xocWI3ZHE2MmQwdjNkcDAyNGRmd2R1NiJ9.jwoEIy9ZhNrwL9eqUiVCOQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yufengx1/clhqbn6y600mx01r86e7o00y1?attribution=false',
      center: [133.7751, -25.2744],
      zoom: 20,
      attributionControl: false,
      pitch: 0,
      bearing: 0,
    });

    const bounds = [
      [112.5, -44], 
      [153.5, -10], 
    ];
    map.fitBounds(bounds, { padding: 20 });

    map.on('style.load', () => {
      // 从API获取数据
      getTransMast().then((res) => {
        const data = res.data.map(({ name, coordinates, value, sentiment }) => ({
          name: name,
          coordinates: coordinates,
          value: value,
          sentiment: sentiment,
        }));

        // 创建数据源
        const geojson = {
          type: 'FeatureCollection',
          features: data.map(({ name, coordinates, value, sentiment }) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [coordinates[1], coordinates[0]],
            },
            properties: {
              value: value,
              name: name,
              sentiment: sentiment,
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
              property: 'value',
              type: 'exponential',
              stops: [
                [0, 10],
                [4000, 30],
              ],
            },
            'circle-color': {
              property: 'value',
              type: 'exponential',
              stops: [
                [0, 'blue'], // 自定义蓝色
                [4000, 'red'], // 自定义红色
              ],
            },
            'circle-opacity': 0.7,
          },
        });

        // 鼠标点击事件处理程序
        map.on('click', 'dots-layer', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['dots-layer'],
          });

          if (features.length > 0) {
            const { name, value, sentiment } = features[0].properties;
            setSelectedPoint({ name, value, sentiment });
            setTextBoxVisibility(true);
          }
        });
      });
    });

    // 在组件卸载时清理地图实例
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1 style={{ fontWeight: 400}}>Mastodon</h1>
      <div style={{ marginBottom: '30px' }}></div> {/* 添加空白区域 */}
      <div id="map" style={{ width: '100%', height: '1000px' }}></div>
      {isTextBoxVisible && (
        <div
          style={{
            position: 'absolute',
            top: '206px',
            right: '103px',
            padding: '10px 24px 10px 24px',
            background: '#F2F7FD',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            zIndex: 1,
            fontFamily: 'Dosis, sans-serif',
            fontWeight: 200,
            fontSize: '16px',
            textAlign: 'center',
            color: '#333',
          }}
        >
          <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
            City: {selectedPoint.name}
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '6px' }}>Counts: {selectedPoint.value}</p>
          <p style={{ fontWeight: 'bold', fontSize: '20px'}}>Sentiment: {selectedPoint.sentiment}</p>
        </div>
      )}

      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
    </div>
  );
}

export default Mapm1;
