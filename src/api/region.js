import request from "@/service/request";

// 查询区域
export function getRegion() {
  return request({
    url: "/jnyb/vedio/getRegion",
    method: "get",
  });
}

// 查询区域下监控点信息
export function getMonitorByRegion(data) {
  return request({
    url: "/jnyb/vedio/getMonitorByRegion",
    method: "post",
    data,
  });
}

// 查询区域下区域列表
export function getSubRegions(data) {
  return request({
    url: "/jnyb/vedio/getSubRegions",
    method: "post",
    data,
  });
}

// 搜索框查询监控点信息
export function selectMonitor(data) {
  return request({
    url: "/jnyb/vedio/selectMonitor",
    method: "post",
    data,
  });
}
