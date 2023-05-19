import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getRentWeekly } from '../../API';

const Chart3 = () => {
  const chartRef1 = useRef(null);
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
      // title: {
      //   text: 'Bar Chart of blabla', // 设置标题文本
      //   textStyle: {
      //     fontWeight: 'bold', 
      //     fontSize: 18, 
      //     left: 'center', // 标题居中对齐
      //     fontFamily: 'Raleway, sans-serif', 
      //   },
      // },
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
    getRentWeekly().then((res) => {
      setData1(res);
    });
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      <div ref={chartRef1} style={{ width: '60%', height: 700 }}></div>
    </div>
  );
};

export default Chart3;
