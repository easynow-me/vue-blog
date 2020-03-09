import request from '@/utils/request';

// todo 对接后端

export function login(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

export function getInfo(
  data: any
): Promise<{
  data: { roles: string[]; name: string; avatar: string; introduction: string };
}> {
  return new Promise(resolve => {
    resolve({
      data: {
        roles: ['Admin'],
        name: 'Admin',
        avatar: '',
        introduction: ''
      }
    });
  });
}
