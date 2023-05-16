import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const Chart1 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = echarts.init(chartRef.current);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      <div ref={chartRef} style={{ width: '50%', height: 400 }}></div>
    </div>
  );
};

export default Chart1;
