<template>
    <div>
    <Row type="flex" justify="start" class="code-row-bg index_nav">
      <Col span="4" class="index_nav_text active">
        <div>单站测试验证</div>
      </Col>
      <Col span="4" class="index_nav_text">
        <div>单站测试验证</div>
      </Col>
      <Col span="4" class="index_nav_text">
        <div>单站测试验证</div>
      </Col>
      <Col span="2" offset="10">2018-09-07</Col>
    </Row>
    <Row :gutter="20" class="index_communication">
      <Col span="4">
        <div>中国移动</div>
      </Col>
      <Col span="4">
        <div>中国移动</div>
      </Col>
      <Col span="4">
        <div>中国移动</div>
      </Col>
    </Row>
    <div class="data_show">
      <div>
        <Row type="flex" justify="start" class="code-row-bg">
          <Col span="14">
            <Row class="station_num">
              <Col span="8">
                <span>计划站点数</span>
                <p>100,000.00</p>
              </Col>
              <Col span="8">
                <span>计划站点数</span>
                <p>100,000.00</p>
              </Col>
              <Col span="8">
                <span>计划站点数</span>
                <p>100,000.00</p>
              </Col>
            </Row>
            <Row class="nationwide">
              <Col>
                <p>全国分包商进度监控（%）</p>
              </Col>
              <Col>
                <div class="nationwide_plan">
                  <div id="nationwide_plan"></div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span="10">
            <Row class="nationwide_map">
              <Col>
                <p>
                  <span>全国分包商进度监控（%）</span>
                  <span>点击地图查看各省分包商进度</span>
                </p>
              </Col>
              <Col class="mapContainer">
                <div id="mapContainer"></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row class="nationwide">
        <Col>
          <p>全国分包商进度监控（%）</p>
        </Col>
        <Col span="24" class="mountNode">
          <div id="mountNode_id"></div>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
// 引入 this.$echarts 主模块
import chinaJson from 'echarts/map/json/china.json'
import G2 from '@antv/g2'
export default {
  name: 'home',
  components: {},
  data () {
    return {}
  },
  methods: {
    lineRender: function (id) {
      this.$echarts.registerMap('china', chinaJson)
      const myCharts = this.$echarts.init(document.getElementById('mapContainer'))
      myCharts.setOption({
        backgroundColor: '#FFFFFF',
        title: {
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            label: {
              width: 200,
              height: 100
            }
          }
        },

        // legend: {
        //     bottom: '5%',
        //     data:['0%-20%','20%-40%','40%-60%','60%-80%','80%-100%']
        // },
        // 左侧小导航图标
        visualMap: {
          show: true,
          x: 'right',
          y: '70%',
          splitList: [
            { start: 400, end: 500, label: '80%-100%' },
            { start: 300, end: 400, label: '60%-80%' },
            { start: 200, end: 300, label: '40%-60%' },
            { start: 100, end: 200, label: '20%-40%' },
            { start: 0, end: 20, label: '0%-20%' }
          ],
          color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },

        // 配置属性
        series: [{
          name: '数据',
          type: 'map',
          map: 'china',
          roam: true,
          label: {
            normal: {
              show: true, // 省份名称
              formatter: function (params) {
                if (params.name === '南海诸岛') {
                  return ' '
                } else {
                  return params.name
                }
              }
            },
            emphasis: {
              show: false
            }
          },
          scaleLimit: {
            min: 1,
            max: 1
          },
          // layoutCenter: ['50%', '50%'],
          // layoutSize: 550,
          left: '0%',
          right: '0%',
          top: '5%',
          bottom: '0%',
          data: [
            {
              name: '南海诸岛',
              value: 0,
              itemStyle: {
                normal: { opacity: 0 }
              }
            },
            { name: '北京', value: '100' }, { name: '天津', value: Math.round(Math.random() * 500) },
            { name: '上海', value: Math.round(Math.random() * 500) }, { name: '重庆', value: Math.round(Math.random() * 500) },
            { name: '河北', value: Math.round(Math.random() * 500) }, { name: '河南', value: Math.round(Math.random() * 500) },
            { name: '云南', value: Math.round(Math.random() * 500) }, { name: '辽宁', value: Math.round(Math.random() * 500) },
            { name: '黑龙江', value: Math.round(Math.random() * 500) }, { name: '湖南', value: Math.round(Math.random() * 500) },
            { name: '安徽', value: Math.round(Math.random() * 500) }, { name: '山东', value: Math.round(Math.random() * 500) },
            { name: '新疆', value: Math.round(Math.random() * 500) }, { name: '江苏', value: Math.round(Math.random() * 500) },
            { name: '浙江', value: Math.round(Math.random() * 500) }, { name: '江西', value: Math.round(Math.random() * 500) },
            { name: '湖北', value: Math.round(Math.random() * 500) }, { name: '广西', value: Math.round(Math.random() * 500) },
            { name: '甘肃', value: Math.round(Math.random() * 500) }, { name: '山西', value: Math.round(Math.random() * 500) },
            { name: '内蒙古', value: Math.round(Math.random() * 500) }, { name: '陕西', value: Math.round(Math.random() * 500) },
            { name: '吉林', value: Math.round(Math.random() * 500) }, { name: '福建', value: Math.round(Math.random() * 500) },
            { name: '贵州', value: Math.round(Math.random() * 500) }, { name: '广东', value: Math.round(Math.random() * 500) },
            { name: '青海', value: Math.round(Math.random() * 500) }, { name: '西藏', value: Math.round(Math.random() * 500) },
            { name: '四川', value: Math.round(Math.random() * 500) }, { name: '宁夏', value: Math.round(Math.random() * 500) },
            { name: '海南', value: Math.round(Math.random() * 500) }, { name: '台湾', value: Math.round(Math.random() * 500) },
            { name: '香港', value: Math.round(Math.random() * 500) }, { name: '澳门', value: Math.round(Math.random() * 500) }
          ] // 数据
        }]
      })

      // 全国分包商进度监控
      const myChart = this.$echarts.init(document.getElementById('nationwide_plan'))
      myChart.setOption({
        grid: {
          left: '0%',
          right: '0%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            // 去除刻度线
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#333'

              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            data: ['华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '华苏', '顺盛', '福诺', '中通服', '顺盛', '福诺', '中通服']

          }
        ],
        yAxis: [
          {
            type: 'value',
            nameLocation: 'end',
            nameGap: 50,
            // show: false,
            // 去除刻度线
            axisTick: {
              show: false
            },
            // 坐标轴相关的设置
            axisLine: {
              show: false,
              lineStyle: {
                color: '#444'
              }
            },
            // 区域中的分割线
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: '#ddd'
              }
            }

          }
        ],

        series: [{
          type: 'bar',
          // 柱子的宽度
          barWidth: '50%',
          data: [100, 100, 100, 100, 99, 98, 99, 98, 99, 96, 95, 95, 94, 94, 90, 90, 88, 80, 80, 80, 77, 77, 70, 66, 60, 55, 50, 45, 40, 35, 30],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [40, 40, 0, 0],
              color: '#467dec',
              label: {
                show: true,
                // position: 'bottom',
                // distance: -23,
                // align: 'left',
                // padding: [0, 100,0, 0],
                fontSize: 10,
                rotate: 90,
                color: '#fff',
                formatter: '{c}%'
              }
            }
          }
        }]
      })
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
          myCharts.resize()
        }
      }, 200)
    },
    // 地区分包商进度监控
    drawLines (id) {
      const _G = G2
      const Shape = _G.Shape
      const Util = _G.Util

      function getFillAttrs (cfg) {
        const attrs = Util.mix({
          fill: cfg.color,
          fillOpacity: cfg.opacity
        }, cfg.style)
        return attrs
      }
      function getRectPath (points) {
        let path = []
        for (let i = 0; i < points.length; i++) {
          const point = points[i]
          if (point) {
            const action = i === 0 ? 'M' : 'L'
            path.push([action, point.x, point.y])
          }
        }
        const first = points[0]
        path.push(['L', first.x, first.y])
        path.push(['z'])
        return path
      }

      Shape.registerShape('interval', 'borderRadius', {
        draw: function draw (cfg, container) {
          const attrs = getFillAttrs(cfg)
          let path = getRectPath(cfg.points)
          path = this.parsePath(path) // 将 0 - 1 的值转换为画布坐标
          const radius = (path[2][1] - path[1][1]) / 2
          let temp = []
          temp.push(['M', path[0][1], path[0][2]])
          temp.push(['L', path[1][1], path[1][2] + radius])
          temp.push(['A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2]])
          temp.push(['L', path[2][1] - radius, path[2][2]])
          temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius])
          temp.push(['L', path[3][1], path[3][2]])
          temp.push(['Z'])
          return container.addShape('path', {
            attrs: Util.mix(attrs, {
              path: temp
            })
          })
        }
      })
      // 基于准备好的dom，初始化this.$echarts实例
      const data = [{
        'name': '华苏',
        '月份': '北京',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '湖南',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '黑龙江',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '天津',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '上海',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '江苏',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '浙江',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '河北',
        '月均降雨量': 100
      }, {
        'name': '华苏',
        '月份': '河南',
        '月均降雨量': 35.6
      }, {
        'name': '顺盛',
        '月份': '北京',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '湖南',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '浙江',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '黑龙江',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '河北',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '河南',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '天津',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '上海',
        '月均降雨量': 90
      }, {
        'name': '顺盛',
        '月份': '江苏',
        '月均降雨量': 90
      }, {
        'name': '福诺',
        '月份': '北京',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '黑龙江',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '河南',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '浙江',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '上海',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '江苏',
        '月均降雨量': 88
      }, {
        'name': '福诺',
        '月份': '湖南',
        '月均降雨量': 88
      }, {
        'name': '中通服',
        '月份': '北京',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '黑龙江',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '河南',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '浙江',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '上海',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '北京',
        '月均降雨量': 77
      }, {
        'name': '中通服',
        '月份': '湖南',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '北京',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '河南',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '北京',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '浙江',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '江苏',
        '月均降雨量': 77
      }, {
        'name': 'ww',
        '月份': '北京',
        '月均降雨量': 77
      }, {
        'name': 'ww',
        '月份': '河南',
        '月均降雨量': 77
      }, {
        'name': 'Befdsfarlin',
        '月份': '湖南',
        '月均降雨量': 77
      }, {
        'name': 'fsad',
        '月份': 'ss',
        '月均降雨量': 77
      }, {
        'name': 'sdfa',
        '月份': 'ssdafss',
        '月均降雨量': 77
      }, {
        'name': 'fsdsfdsaad',
        '月份': 'sdaf',
        '月均降雨量': 77
      }, {
        'name': 'fssdafad',
        '月份': 'ssdafass',
        '月均降雨量': 77
      }, {
        'name': 'ffsdasad',
        '月份': 'fdsaasdf',
        '月均降雨量': 77
      }
      ]
      const chart = new G2.Chart({
        container: document.getElementById('mountNode_id'),
        forceFit: true,
        height: 200,
        padding: 'auto'
      })
      chart.coord('rect').scale(1, 0.9)
      chart.source(data, {
        月均降雨量: {
          formatter: function formatter (val) {
            return val
          }
        },
        月份: {
          tickInterval: 1000

        }
      })
      chart.axis('月份', {
        line: {
          lineWidth: 0 // 设置线的宽度
        },
        tickLine: null
      })

      chart.interval().position('月份*月均降雨量').color('name').size(15).label('月均降雨量*name', (x, y) => {
        return x + ' ' + y
      }, {
        offset: -3,
        textStyle: {
          fill: '#fff',
          rotate: 33,
          textAlign: 'start',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
          textBaseline: 'middle'
        },
        autoRotate: true
      }).adjust([{
        type: 'dodge',
        marginRatio: 0.5
      }]).shape('date*actual', function (date, val) {
        if (val === 0) {

        } else {
          return 'borderRadius'
        }
      })
      chart.legend(false)
      chart.tooltip(true, {
        triggerOn: 'mousemove',
        shared: false
      })
      chart.render()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.lineRender('nationwide_plan')
      this.drawLines('mountNode_id')
    })
  }
}
</script>

<style>
.index_nav{
  height: 60px;
  line-height: 60px;
  background: #fff;
  margin: -20px -20px 0;
}
.index_nav_text{
  font-size: 24px;
  color: #444;
  text-align: center;
}
.index_nav_text.active{
  background: #f7f7f7;
  border-bottom: 4px solid #409eff;
}
.index_communication{
  /* background: #fafafa; */
  padding: 20px 0;
  text-align: center;
}
.index_communication>div>div{
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  font-size: 20px;
  background: #fff;
  height: 40px;
  line-height: 40px;
}
.index_communication>div>div:hover{
  background: #409eff;
  color: #fff;
}
.data_show{
  padding-bottom: 70px;
}
.data_show>div{
  background: #fff;
  border-bottom: 2px solid #fafafa;
}
.data_show>div>div:first-child>div{
  border-right: 2px solid #fafafa;
}
.station_num span{
  font-size: 18px;
  color: #666;
}
.station_num p{
  font-size: 36px;
  color: #555;
  font-weight: bold;
}
.station_num>div{
  padding: 20px 40px;
  text-align: left;
  border-right: 2px solid #fafafa;
  border-bottom: 2px solid #fafafa;
}
.station_num>div:last-child{
  border-right: none;
}
.nationwide>div>p,.nationwide_map>div>p{
  font-size: 20px;
  border-left: 3px solid #409eff;
  margin: 20px;
  line-height: 20px;
  color: #333;
  padding-left: 20px;
}
.nationwide_map>div:first-child{
  position: absolute;
  z-index: 1;
}
.nationwide_map>div>p{
  text-align: left;
  margin-left: 40px;
}
.nationwide_map>div>p>span{
  display: block;
}
.nationwide_map>div>p>span:last-child{
  font-size: 14px;
}
.nationwide_plan{
  padding: 0 20px;
}
.nationwide_plan>div{
  height:250px;
}
.mapContainer{
  padding: 0 40px;
}
.mapContainer>div{

  height: 430px;
}
@media (max-width: 1366px) {
    .mapContainer>div{
      height: 300px;
      top: 80px;
    }
}
.mountNode{
  padding: 0 20px 0px;
}
</style>
