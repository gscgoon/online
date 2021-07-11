import request from '@/utils/request'

const api_name = '/admin/Acl/user'

export default {

  /**
   * 获取管理用户
   * @param {*} page 
   * @param {*} limit 
   * @param {*} searchObj 
   */
  getPageList(page, limit, searchObj) {
      return request({
          url: `${api_name}/getUserList/${page}/${limit}`,
          method: 'get',
          params: searchObj // url查询字符串或表单键值对
      })
  },

  /**
   * 新增用户
   * @param {*} user 
   */
  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },

  /**
   * 删除用户
   * @param {*} id 
   */
  removeById(id){
    return request({
      url: `${api_name}/removeById/${id}`,
      method: 'delete'
    })
  },

  /**
   * 修改用户
   * @param {*} user 
   */
  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },

  /**
   * 
   * @param {*} id 
   */
  getById(id) {
      return request({
        url: `${api_name}/get/${id}`,
        method: 'get'
      })
    },
  
   
  
    /**
     * 根据用户获取角色数据
     * @param {*} userId 
     */
    getAssign(userId){
      return request({
        url: `${api_name}/toAssign/${userId}`,
        method: 'get'
      })
    },

    /**
     * 根据用户分配角色
     * @param {*} userId 
     * @param {*} roleId 
     */
    saveAssign(userId, roleId){
      return request({
        url: `${api_name}/doAssign`,
        method: 'post',
        params:{userId, roleId}
      })
    },
    
    /**
     * 根据id列表删除管理用户
     * @param {*} idList 
     */
    removeRows(idList){
      return request({
        url: `${api_name}/batchRemoveUser`,
        method: 'delete',
        data:idList
      })
    }
}
