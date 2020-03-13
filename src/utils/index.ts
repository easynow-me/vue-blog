import * as jspb from 'google-protobuf';
import { ResultReply } from '@/protos/resultReply_pb';
import { PagedList } from '@/protos/pagedList_pb';
import { grpc } from '@improbable-eng/grpc-web';

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

/**
 * 移除markdown中的标记，只取文本
 * @param md
 */
export function md2Text(md: string): string {
  return md.replace(/#*.*#/g, '').replace(/[^a-z0-9\u4e00-\u9fa5]/, '');
}

/**
 * 将对象的个属性值赋值到grpc的message对象
 * @param source
 * @param msg
 */
export function copyValueToGrpcMsg(source: any, msg: jspb.Message) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const methodName = `set${key.substr(0, 1).toUpperCase()}${key
        .substr(1)
        .toLowerCase()}`;
      if (typeof (msg as any)[methodName] === 'function') {
        (msg as any)[methodName](source[key]);
      }
    }
  }
}

/**
 * 从ResultReply中获取数据
 * @param reply
 * @param deserializeBinary
 */
export function getDataFromResultReply<T extends jspb.Message>(
  reply: ResultReply | null,
  deserializeBinary: (bytes: Uint8Array) => T
): T | null {
  if (reply && reply.getCode()) {
    const data = reply.getData();
    if (data) {
      const result = data.unpack(deserializeBinary, data.getTypeName());
      if (result) {
        return result;
      }
    }
  }
  return null;
}

/**
 * 从PagedList中获取PageList
 * @param pagedList
 * @param deserializeBinary
 */
export function getPageListFromPagedList<T extends jspb.Message, TData>(
  pagedList: PagedList | null,
  deserializeBinary: (bytes: Uint8Array) => T
): PageList<TData> | null {
  if (pagedList && pagedList.getItemsList()) {
    const list = pagedList.getItemsList();
    if (list) {
      const result = list.map(item => {
        return (item.unpack(
          deserializeBinary,
          item.getTypeName()
        ) as T).toObject() as TData;
      });
      if (result) {
        return {
          pageSize: pagedList.getPagesize(),
          pageNumber: pagedList.getPagenumber(),
          items: result
        };
      }
    }
  }
  return null;
}

/**
 * 从ResultReply中获取PageList
 * @param reply
 * @param deserializeBinary
 */
export function getPageListFromResultReply<T extends jspb.Message, TData>(
  reply: ResultReply | null,
  deserializeBinary: (bytes: Uint8Array) => T
): PageList<TData> | null {
  const data = getDataFromResultReply(reply, PagedList.deserializeBinary);
  if (data) {
    return getPageListFromPagedList<T, TData>(data, deserializeBinary);
  }
  return null;
}

/**
 * 从ResultReply解析出PageList
 * @param reply
 * @param deserializeBinary
 * @param resolveFn
 * @param rejectFn
 */
export function resolvePageListFromResultReply<T extends jspb.Message, TData>(
  reply: ResultReply | null,
  deserializeBinary: (bytes: Uint8Array) => T,
  resolveFn: (
    value?: PageList<TData> | PromiseLike<PageList<TData>> | undefined
  ) => void,
  rejectFn: () => void
) {
  const data = getDataFromResultReply(reply, PagedList.deserializeBinary);
  if (data) {
    const list = getPageListFromPagedList<T, TData>(data, deserializeBinary);
    if (list) {
      resolveFn({
        pageNumber: list.pageNumber,
        pageSize: list.pageSize,
        items: list.items
      });
      return;
    }
  }
  rejectFn();
}

/**
 * 获取PageList
 * @param req
 * @param method
 * @param deserializeBinary
 */
export function getPageList<
  T extends jspb.Message,
  TReq extends jspb.Message,
  TData
>(
  req: TReq,
  method: (
    req: TReq,
    callback: (
      error: { message: string; code: number; metadata: grpc.Metadata } | null,
      responseMessage: ResultReply | null
    ) => void
  ) => { cancel(): void },
  deserializeBinary: (bytes: Uint8Array) => T
) {
  return new Promise<PageList<TData>>((resolve, reject) => {
    method(req, (err, resp) => {
      resolvePageListFromResultReply<T, TData>(
        resp,
        deserializeBinary,
        resolve,
        () => {
          reject(err);
        }
      );
    });
  });
}

/**
 * 获取数据
 * @param req
 * @param method
 * @param deserializeBinary
 */
export function getData<
  T extends jspb.Message,
  TReq extends jspb.Message,
  TData
>(
  req: TReq,
  method: (
    req: TReq,
    callback: (
      error: { message: string; code: number; metadata: grpc.Metadata } | null,
      responseMessage: ResultReply | null
    ) => void
  ) => { cancel(): void },
  deserializeBinary: (bytes: Uint8Array) => T
) {
  return new Promise<TData>((resolve, reject) => {
    method(req, (err, resp) => {
      const data = getDataFromResultReply<T>(resp, deserializeBinary);
      if (data) {
        resolve(data.toObject() as TData);
        return;
      }
      reject(err);
    });
  });
}

export function getResultReply<TReq extends jspb.Message>(
  req: TReq,
  method: (
    req: TReq,
    callback: (
      error: { message: string; code: number; metadata: grpc.Metadata } | null,
      responseMessage: ResultReply | null
    ) => void
  ) => { cancel(): void }
) {
  return new Promise<ResultReply>((resolve, reject) => {
    method(req, (err, resp) => {
      if (resp) {
        resolve(resp);
        return;
      }
      reject(err);
    });
  });
}

export class PageList<T> {
  public pageNumber!: number;
  public pageSize!: number;
  public items!: T[];
}
