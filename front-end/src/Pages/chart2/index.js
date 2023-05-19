// charts for lgbt
import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getLgbtratio, getLgbtliving } from '../../API';

const Chart2 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  useEffect(() => {
    if (!chartRef1.current || !data1) {
      return;
    }

    // Chart 1
    const keys1 = Object.keys(data1.same_sex_couple[0]);
    const values1 = Object.values(data1.same_sex_couple[0]);

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
          // label: {
          //   show: true,
          //   position: 'top', // 在柱状图顶部显示标签
          //   formatter: '{c}', // 使用数据值作为标签文本
          //   fontWeight: 'bold', // 标签文本加粗
          // }
        },
      ],
    };

    chart1.setOption(option1);
    
    return () => {
      chart1.dispose();
    };
  }, [data1]);

  // Chart 2
  useEffect(() => {
    if (!chartRef2.current || !data2) {
      return;
    }

    // 从 data2 中提取所有数据
    const allData = Object.values(data2).flatMap((dataArray) => dataArray[0]);

    // 提取所有 x 值作为 category
    const categories = Object.keys(allData[0]);

    // 根据 x 值，将所有对应的 y 值分组
    const seriesData = Object.values(data2).map((dataArray) =>
      Object.values(dataArray[0])
    );

    const chart2 = echarts.init(chartRef2.current);
    const option2 = {
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData.map((data, index) => ({
        data,
        type: 'bar',
        name: Object.keys(data2)[index], // 使用数据的键作为系列名称
      })),
      legend: {
        data: Object.keys(data2), // 图例的数据，即系列的名称
        formatter: function (name) {
          // 自定义图例的文字
          if (name === 'female_couple_livingtogether') {
            return 'Female Couple';
          } else if (name === 'male_couple_livingtogether') {
            return 'Male Couple';
          } else if (name === 'total_couple_livingtogether') {
            return 'Total Couple';
          } else {
            return name;
          }
        },
      }
    };

    chart2.setOption(option2);

    return () => {
      chart2.dispose();
    };
  }, [data2]);

  // Chart 3
  useEffect(() => {
    if (!chartRef3.current || !data3) {
      return;
    }

    // 从 data3 中提取所有数据
    const allData = Object.values(data3).flatMap((dataArray) => dataArray[0]);

    // 提取所有 x 值作为 category
    const categories = Object.keys(allData[0]);

    // 根据 x 值，将所有对应的 y 值分组
    const seriesData = Object.values(data3).map((dataArray) =>
      Object.values(dataArray[0])
    );

    const chart3 = echarts.init(chartRef3.current);
    const option3 = {
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData.map((data, index) => ({
        data,
        type: 'bar',
        name: Object.keys(data3)[index], // 使用数据的键作为系列名称
      })),
      legend: {
        data: Object.keys(data3), // 图例的数据，即系列的名称
        formatter: function (name) {
          // 自定义图例的文字
          if (name === 'female_couple_livingtogether') {
            return 'Female Couple';
          } else if (name === 'male_couple_livingtogether') {
            return 'Male Couple';
          } else if (name === 'total_couple_livingtogether') {
            return 'Total Couple';
          } else {
            return name;
          }
        },
      }
    };

    chart3.setOption(option3);

    return () => {
      chart3.dispose();
    };
  }, [data3]);
  
  useEffect(() => {
    getLgbtratio().then((res) => {
      setData1(res);
    });

    getLgbtliving().then((res) => {
      setData2(res.State);
      setData3(res.City);
    });
    
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      <div ref={chartRef1} style={{ width: '60%', height: 500 }}></div>
      <h2 style={{ marginBottom: '35px', marginTop: '40px', position: 'relative', left: '54px' }}>
        Proportion of LGBT couples living together by State vs by City</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div ref={chartRef2} style={{ width: '50%', height: 400 }}></div>
        <div ref={chartRef3} style={{ width: '50%', height: 400 }}></div>
      </div>
      
    </div>

  );
};

export default Chart2;
