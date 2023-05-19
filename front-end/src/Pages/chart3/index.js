import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getRentWeekly } from '../../API';

const Chart3 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    if (!chartRef1.current || !data1) {
      return;
    }

    // Chart 1
    const keys1 = Object.keys(data1.data[0]);
    const values1 = Object.values(data1.data[0]);

    const chart1 = echarts.init(chartRef1.current);
    const option1 = {
      xAxis: {
        type: 'category',
        data: keys1,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: values1,
          type: 'bar',
        },
      ],
    };

    chart1.setOption(option1);

    return () => {
      chart1.dispose();
    };
  }, [data1]);

  useEffect(() => {
    if (!chartRef2.current || !data1) {
      return;
    }

    // Chart 2
    const keys2 = Object.keys(data1.data[1]);
    const values2 = Object.values(data1.data[1]);

    const chart2 = echarts.init(chartRef2.current);
    const option2 = {
      xAxis: {
        type: 'category',
        data: keys2,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: values2,
          type: 'bar',
        },
      ],
    };

    chart2.setOption(option2);

    return () => {
      chart2.dispose();
    };
  }, [data1]);

  useEffect(() => {
    getRentWeekly().then((res) => {
      setData1(res);
    });
  }, []);

  return (
    <div>
      <h1 style={{ position: 'relative', left: '54px', fontWeight: 400, fontSize: '38px', marginTop: '60px' }}>Charts</h1>
      <div style={{ marginBottom: '80px' }}></div> {/* 添加空白区域 */}
      <div style={{ display: 'flex' }}>
        <div ref={chartRef1} style={{ width: '50%', height: 700 }}></div>
        <div ref={chartRef2} style={{ width: '50%', height: 700 }}></div>
      </div>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
    </div>
  );
};

export default Chart3;
