import request from '@/utils/request'

export default {
    /**
     * 生成统计
     * @param {*} day 
     */
    createStatistics(day){
        return request ({
            url: `/admin/serviceStatistics/daily/statisticsData/${day}`,
            method:'get'
        })
    },
    //图表展示数据
    showChart(searchObj){
        return request({
            url: `/admin/serviceStatistics/daily/showChart/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }
}