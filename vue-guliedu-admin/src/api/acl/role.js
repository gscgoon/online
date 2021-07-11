import request from '@/utils/request'

const api_name = '/admin/Acl/role'

export default {

  /**
   * 获取角色分页列表
   * @param {*} page 
   * @param {*} limit 
   * @param {*} searchObj 
   */
  getPageList(page, limit, searchObj) {
      return request({
          url: `${api_name}/getRoleList/${page}/${limit}`,
          method: 'get',
          params: searchObj // url查询字符串或表单键值对
      })
  },
  /**
   * 根据id获取角色信息
   * @param {*} id 
   */
  getById(id) {
      return request({
        url: `${api_name}/getRoleById/${id}`,
        method: 'get'
      })
  },
  
  /**
   * 新增角色
   * @param {*} role 
   */
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },

  /**
   * 修改角色
   * @param {*} role 
   */
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },

  /**
   * 
   * @param {*} roleId 
   */
  getAssign(roleId){
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /**
   * 删除角色
   * @param {*} id 
   */
  removeById(id){
    return request({
      url: `${api_name}/removeRole/${id}`,
      method: 'delete'
    })
  },

  /**
   * 根据id列表删除角色
   * @param {*} idList 
   */
  removeRows(idList){
    return request({
      url: `${api_name}/batchRemoveRole`,
      method: 'delete',
      data:idList
    })
  },

  /**
   * 获取到所有角色
   * @returns 
   */
  getAllRole(){
    return request({
      url: `${api_name}/getAllRole`,
      method:'get'
    })
  }
      
}
