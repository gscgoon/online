import request from '@/utils/request'

const api_name = '/admin/Acl/permission'

export default {
  
  /**
   * 查询所有菜单
   */
  getNestedTreeList() {
    return request({
      url: `${api_name}/getAllMenu`,
      method: 'get'
    })
  },

  /**
   * 递归删除菜单
   * @param {*} id 
   */
  removeById(id) {
    return request({
      url: `${api_name}/removeMenu/${id}`,
      method: "delete"
    })
  },

  /**
   * 新增菜单
   * @param {*} menu 
   */
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: menu
    })
  },

  /**
   * 修改菜单
   * @param {*} menu 
   */
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: menu
    })
  },

  /**
   * 根据角色获取菜单
   * @param {*} roleId 
   */
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /**
   * 给角色分配权限
   * @param {*} roleId 
   * @param {*} permissionId 
   */
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      params: {roleId, permissionId}
    })
  }
}
