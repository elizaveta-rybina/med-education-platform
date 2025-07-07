import { ApexOptions } from "apexcharts"
import { useState } from "react"
import Chart from "react-apexcharts"
import { MoreDotIcon } from "../../icons"
import { Dropdown } from "../ui/dropdown/Dropdown"
import { DropdownItem } from "../ui/dropdown/DropdownItem"

export default function MonthlyEnrollmentsChart() {
  const options: ApexOptions = {
    colors: ["#aa83cc"], // Зеленый цвет для образовательной тематики
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
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
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        formatter: function(val) {
          return Math.floor(val).toString(); // Целые числа для количества
        }
      }
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val} зачислений`,
      },
    },
  };

  const series = [
    {
      name: "Зачисления",
      data: [85, 120, 95, 150, 110, 180, 160, 210, 190, 240, 200, 170],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Зачисления на курсы
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Динамика по месяцам
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Детальный отчет
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Экспорт данных
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart 
            options={options} 
            series={series} 
            type="bar" 
            height={180} 
          />
        </div>
      </div>
    </div>
  );
}