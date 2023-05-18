// charts for lgbt
import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getLgbtratio, getLgbtliving } from '../../API';

const Chart2 = () => {
  const chartRef1 = useRef(null);
  // const chartRef2 = useRef(null);
  const [data1, setData1] = useState(null);
  // const [data2, setData2] = useState(null);

  useEffect(() => {
    if (!chartRef1.current || !data1) {
      return;
    }

    // Chart 1
    const keys1 = Object.keys(data1);
    const values1 = Object.values(data1);

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

  // useEffect(() => {
  //   if (!chartRef2.current || !data2) {
  //     return;
  //   }

  //   // Chart 2
  //   const keys2 = Object.keys(data2);
  //   const values2 = Object.values(data2);

  //   const chart2 = echarts.init(chartRef2.current);
  //   const option2 = {
  //     xAxis: {
  //       type: 'category',
  //       data: keys2,
  //     },
  //     yAxis: {
  //       type: 'value',
  //     },
  //     series: [
  //       {
  //         data: values2,
  //         type: 'bar',
  //       },
  //     ],
  //   };

  //   chart2.setOption(option2);

  //   return () => {
  //     chart2.dispose();
  //   };
  // }, [data2]);

  useEffect(() => {
    getLgbtratio().then((res) => {
      setData1(res.same_sex_couple[0]);
    });

    // getLgbtliving().then((res) => {
    //   setData2(res);
    // });
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      <div ref={chartRef1} style={{ width: '50%', height: 400 }}></div>
      {/* <div ref={chartRef2} style={{ width: '50%', height: 400 }}></div> */}
    </div>
  );
};

export default Chart2;
