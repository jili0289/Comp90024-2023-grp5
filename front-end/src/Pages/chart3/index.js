import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getRentWeekly, getRentSenti } from '../../API';

const Chart3 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const [data1, setData1] = useState(null);
  const [data3, setData3] = useState(null);

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
        axisLabel: {
          interval: 0, // 或其他适当的值
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1200000,
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
        min: 0,
        max: 1200000,
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

  // chart 3
  useEffect(() => {
    if (!chartRef3.current || !data3) {
      return;
    }

    const chart3 = echarts.init(chartRef3.current);
    const option3 = {
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
          data: data3,
        },
      ],
    };

    chart3.setOption(option3);

    return () => {
      chart3.dispose();
    };
  }, [data3]);



  useEffect(() => {
    getRentWeekly().then((res) => {
      setData1(res);
    });

    getRentSenti().then((res) => {
      const formattedData = [
        { value: res.data[0].pos, name: 'Positive' },
        { value: res.data[0].neu, name: 'Neutral' },
        { value: res.data[0].neg, name: 'Negative' },
      ];
      setData3(formattedData);
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '80px' }}></div> {/* 添加空白区域 */}
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '36px', fontWeight: 400 }}>
      Chart 1 & 2: Total weekly renting price by <span style={{ fontStyle: 'italic' }}>State</span> vs by <span style={{ fontStyle: 'italic' }}>City</span></h1>
      <div style={{ display: 'flex' }}>
        <div ref={chartRef2} style={{ width: '50%', height: 900 }}></div>
        <div ref={chartRef1} style={{ width: '50%', height: 900 }}></div>
      </div>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '39px' , fontWeight: 400 }}>
      Chart 3: Ratio of sentiments all over Australia</h1>
      <div ref={chartRef3} style={{ width: '60%', height: 600 }}></div>
      <div style={{ marginBottom: '100px' }}></div> {/* 添加空白区域 */}
    
    </div>
  );
};

export default Chart3;
