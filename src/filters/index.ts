export { parseTime, formatTime } from '@/utils';

/**
 * 如果时间是复数，则显示复数标识
 * @param time 时间
 * @param label 标志
 */
function pluralize(time: number, label: string): string {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

export function timeAgo(time: any): string {
  const between = Date.now() / 1000 - Number(time);
  // tslint:disable: no-magic-numbers
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
  // tslint:enable: no-magic-numbers
}

/**
 * 数字格式化
 * 如：10000 => 10k
 * @param num 数字
 * @param digits 小数位数
 */
export function numberFormatter(num: number, digits: number): string {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 10000 => 10,000
 * @param num 数值
 */
export function toThousandFilter(num: number): string {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * 首字母大写
 * @param str 字符串
 */
export function uppercaseFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
