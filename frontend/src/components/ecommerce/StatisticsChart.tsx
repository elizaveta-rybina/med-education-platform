import ChartTab from '@/components/common/ChartTab'
import { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"

export default function LearningActivityChart() {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#aa83cc", "#2d4285"], // Зеленый для студентов, синий для курсов
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth", // Более плавные линии для визуализации трендов
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
        "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#aa83cc"],
        },
        formatter: function(value) {
          return value.toLocaleString('ru-RU'); // Форматирование чисел для RU
        }
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Новые студенты",
      data: [120, 150, 130, 160, 175, 200, 190, 220, 250, 280, 300, 320],
    },
    {
      name: "Активные курсы",
      data: [15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Активность обучения
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Динамика новых студентов и активных курсов
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab 
            options={[
              { label: "За год", value: "year" },
              { label: "За квартал", value: "quarter" },
              { label: "За месяц", value: "month" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#aa83cc]"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Новые студенты</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2d4285]"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Активные курсы</span>
        </div>
      </div>
    </div>
  );
}