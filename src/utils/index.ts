/**
 * 格式化时间为字符串
 * @param time 时间
 * @param cFormat 格式
 */
export function parseTime(
  time: Date | string | number,
  cFormat: string
): string | null {
  if (arguments.length === 0) {
    return null;
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  if (typeof time === 'object') {
    date = time;
  } else {
    let timeValue: Date | string | number = time;
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      timeValue = Number(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      timeValue = time * 1000;
    }
    date = new Date(timeValue);
  }

  const timeStr = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result: string, key: string) => {
      let value = 0;
      switch (key) {
        case 'y':
          value = date.getFullYear();
          break;
        case 'm':
          value = date.getMonth() + 1;
          break;
        case 'd':
          value = date.getDate();
          break;
        case 'h':
          value = date.getHours();
          break;
        case 'i':
          value = date.getMinutes();
          break;
        case 's':
          value = date.getSeconds();
          break;
        case 'a':
          value = date.getDay();
          break;
      }
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        return '0' + value;
      }
      return value.toString();
    }
  );
  return timeStr;
}

/**
 * 格式化时间
 * @param time 时间
 * @param option 格式
 */
export function formatTime(time: number, option: string): string | null {
  let date: number;
  if (('' + time).length === 10) {
    date = time * 1000;
  } else {
    date = +time;
  }
  const d: Date = new Date(date);
  const now: number = Date.now();

  const diff = (now - d.getTime()) / 1000;

  // tslint:disable: no-magic-numbers
  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  // tslint:enable: no-magic-numbers
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * 检查元素是否有指定class
 * @param ele 元素
 * @param cls class名
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 添加class到元素
 * @param ele 元素
 * @param cls class名
 */
export function addClass(ele: HTMLElement, cls: string): void {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

/**
 * 从元素中移除class
 * @param ele 元素
 * @param cls class名
 */
export function removeClass(ele: HTMLElement, cls: string): void {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
