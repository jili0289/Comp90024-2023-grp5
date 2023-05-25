
import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getLgbtratio, getLgbtliving, getLgbtSenti } from '../../API';

const Chart2 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);

  useEffect(() => {
    if (!chartRef1.current || !data1) {
      return;
    }

    // Chart 1
    const keys1 = Object.keys(data1.same_sex_couple[0]);
    const values1 = Object.values(data1.same_sex_couple[0]);

    const chart1 = echarts.init(chartRef1.current);
    const option1 = {
      xAxis: {
        type: 'category',
        data: keys1,
        axisLabel: {
          rotate: 15,
          interval: 0, 
        },
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

  // Chart 2
  useEffect(() => {
    if (!chartRef2.current || !data2) {
      return;
    }

    
    const allData = Object.values(data2).flatMap((dataArray) => dataArray[0]);

    
    const categories = Object.keys(allData[0]);

    
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
        name: Object.keys(data2)[index], 
      })),
      legend: {
        data: Object.keys(data2), 
        formatter: function (name) {
          
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

  
  useEffect(() => {
    if (!chartRef3.current || !data3) {
      return;
    }

    
    const allData = Object.values(data3).flatMap((dataArray) => dataArray[0]);

    
    const categories = Object.keys(allData[0]);

    
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
        name: Object.keys(data3)[index], 
      })),
      legend: {
        data: Object.keys(data3), 
        formatter: function (name) {
          
          if (name === 'female_couple_city') {
            return 'Female Couple';
          } else if (name === 'male_couple_city') {
            return 'Male Couple';
          } else if (name === 'total_couple_city') {
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
    if (!chartRef4.current || !data4) {
      return;
    }

    const chart4 = echarts.init(chartRef4.current);
    const option4 = {
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
          data: data4,
        },
      ],
    };

    chart4.setOption(option4);

    return () => {
      chart4.dispose();
    };
  }, [data4]);

  
  useEffect(() => {
    getLgbtratio().then((res) => {
      setData1(res);
    });

    getLgbtliving().then((res) => {
      setData2(res.State);
      setData3(res.City);
    });
    
    getLgbtSenti().then((res) => {
      const formattedData = [
        { value: res.data[0].pos, name: 'Positive' },
        { value: res.data[0].neu, name: 'Neutral' },
        { value: res.data[0].neg, name: 'Negative' },
      ];
      setData4(formattedData);
    });

  }, []);

  return (
    <div>
      <div style={{ marginBottom: '80px' }}></div> 
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '54px' , fontWeight: 400 }}>
        Chart 1: Proportion of LGBTQ+ People in Different States</h1>
      <div ref={chartRef1} style={{ width: '60%', height: 600 }}></div>
      <div style={{ marginBottom: '100px' }}></div> 
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '54px', fontWeight: 400 }}>
        Chart 2 & 3: Proportion of LGBTQ+ couples living together by <span style={{ fontStyle: 'italic' }}>State</span> vs by <span style={{ fontStyle: 'italic' }}>City</span></h1>
      <h2 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '54px', fontWeight: 400 }}>
       The two bar charts show the percentage of LGBTQ+ people living together from the total LGBTQ+ population by state vs city.</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div ref={chartRef2} style={{ width: '50%', height: 500 }}></div>
        <div ref={chartRef3} style={{ width: '50%', height: 500 }}></div>
      </div>
      <div style={{ marginBottom: '100px' }}></div> 
      <h1 style={{ marginBottom: '45px', marginTop: '40px', position: 'relative', left: '54px' , fontWeight: 400 }}>
        Chart 4: Ratio of sentiments all over Australia</h1>
      <div ref={chartRef4} style={{ width: '60%', height: 600 }}></div>

      <div style={{ marginBottom: '100px' }}></div> 
    </div>

  );
};

export default Chart2;
