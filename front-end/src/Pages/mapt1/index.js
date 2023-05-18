import { useEffect, useState } from "react";
import { getTransTwit } from "../../API";
import mapboxgl from 'mapbox-gl';

function Mapt1() {
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
      getTransTwit().then((res) => {
        const data = res.data.map(({ name, coordinates, value }) => ({
          name: name,
          coordinates: coordinates,
          value: value,
        }));

        // 创建数据源
        const geojson = {
          type: 'FeatureCollection',
          features: data.map(({ name, coordinates, value }) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [coordinates[1], coordinates[0]],
            },
            properties: {
              value: value,
              name: name,
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
                [0, 5],
                [100, 10],
              ],
            },
            'circle-color': {
              property: 'value',
              type: 'exponential',
              stops: [
                [0, 'blue'],
                [10000, 'red'],
              ],
            },
            'circle-opacity': 0.7,
          },
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
      <h1>Twitter</h1>
      <div id="map" style={{ width: '100%', height: '1000px' }}></div>
    </div>
  );
}

export default Mapt1;
