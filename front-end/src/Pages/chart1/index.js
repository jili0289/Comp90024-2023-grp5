import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getSample } from '../../API';

const Chart1 = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!chartRef.current || !data) {
      return;
    }

    const keys = []; // 存储 key 的数组
    const values = []; // 存储 value 的数组

    // 提取 key 和 value 并存储到数组中
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key];
        keys.push(key);
        values.push(value);
      }
    }

    console.log("Keys:", keys);
    console.log("Values:", values);

    const chart = echarts.init(chartRef.current);
    const option = {
      xAxis: {
        type: 'category',
        data: keys,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: values,
          type: 'bar',
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  useEffect(() => {
    getSample().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      <div ref={chartRef} style={{ width: '50%', height: 400 }}></div>
    </div>
  );
};

export default Chart1;
