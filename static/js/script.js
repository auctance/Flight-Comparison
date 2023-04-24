$(document).ready(function() {
    // 定义省份列表
    var provinces = ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安', '重庆', '青岛', '长沙', '南京', '厦门', '昆明', '大连', '天津', '郑州', '三亚', '济南', '福州', '阿勒泰', '阿克苏', '鞍山', '安庆', '安顺', '阿拉善左旗', '中国澳门', '阿里', '阿拉善右旗', '阿尔山', '巴中', '百色', '包头', '毕节', '北海', '北京(大兴国际机场)', '北京(首都国际机场)', '博乐', '保山', '白城', '布尔津', '白山', '巴彦淖尔', '昌都', '承德', '常德', '长春', '朝阳', '赤峰', '长治', '沧源', '常州', '池州', '大同', '达州', '稻城', '丹东', '迪庆', '大理', '敦煌', '东营', '大庆', '德令哈', '鄂尔多斯', '额济纳旗', '恩施', '二连浩特', '阜阳', '抚远', '富蕴', '果洛', '格尔木', '广元', '固原', '中国高雄', '赣州', '贵阳', '桂林', '红原', '海口', '河池', '邯郸', '黑河', '呼和浩特', '合肥', '淮安', '怀化', '海拉尔', '哈密', '衡阳', '哈尔滨', '和田', '花土沟', '中国花莲', '霍林郭勒', '惠州', '汉中', '黄山', '呼伦贝尔', '中国嘉义', '景德镇', '加格达奇', '嘉峪关', '井冈山', '金昌', '九江', '荆门', '佳木斯', '济宁', '锦州', '建三江', '鸡西', '九寨沟', '中国金门', '揭阳', '库车', '康定', '喀什', '凯里', '库尔勒', '克拉玛依', '黎平', '澜沧', '龙岩', '临汾', '兰州', '丽江', '荔波', '吕梁', '临沧', '陇南', '六盘水', '拉萨', '洛阳', '连云港', '临沂',    '柳州', '泸州', '林芝', '芒市', '牡丹江', '中国马祖', '绵阳', '梅州', '中国马公',    '满洲里', '漠河', '南昌', '中国南竿', '南充', '宁波', '宁蒗', '南宁', '南阳',    '南通', '攀枝花', '普洱', '琼海', '秦皇岛', '祁连', '且末', '庆阳', '黔江',    '泉州', '衢州', '齐齐哈尔', '日照', '日喀则', '若羌', '神农架', '莎车', '沈阳',    '石河子', '石家庄', '上饶', '三明', '十堰', '邵阳', '松原', '台州', '中国台中',    '塔城', '腾冲', '铜仁', '通辽', '天水', '吐鲁番', '通化', '中国台南', '中国台北',    '中国台东', '唐山', '太原', '五大连池', '乌兰浩特', '乌兰察布', '乌鲁木齐', '潍坊',    '威海', '文山', '温州', '乌海', '武夷山', '无锡', '梧州', '万州', '乌拉特中旗',    '巫山', '兴义', '夏河', '中国香港', '西双版纳', '新源', '忻州', '信阳', '襄阳',    '西昌', '锡林浩特', '西宁', '徐州', '延安', '银川', '伊春', '永州', '榆林',    '宜宾', '运城', '宜春', '宜昌', '伊宁', '义乌', '营口', '延吉', '烟台',    '盐城', '扬州', '玉树', '岳阳', '张家界', '舟山', '扎兰屯', '张掖', '昭通',    '湛江', '中卫', '张家口', '珠海', '遵义'];



    // 生成出发地和目的地的下拉框选项
    $.each(provinces, function(index, province) {
      $('#departure').append($('<option>', {
        value: province,
        text: province
      }));
      $('#destination').append($('<option>', {
        value: province,
        text: province
      }));
    });

    console.log(provinces);
//    console.log("test");

  // 监听表单提交事件
  $('#search-form').submit(function(event) {
    // 阻止表单默认的提交行为
    event.preventDefault();

    // 获取用户选择的出发地和目的地
    var formData = {
      'departure': $('select[name=departure]').val(),
      'destination': $('select[name=destination]').val(),
      'start_date': $('input[name=start_date]').val(),
      'end_date': $('input[name=end_date]').val()
    };
    console.log(departure)

    // 发送异步请求
    $.ajax({
      type: 'POST',
      url: '/search_flights',
      data: formData,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).done(function(data) {
      // 成功返回结果后的回调函数
      // 在页面中展示机票价格信息
      displayResults(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // 处理请求失败的情况
      alert('Error: ' + textStatus + ' - ' + errorThrown);
    });


  });
});


var regions_r = {'BJS': '北京', 'SHA': '上海', 'CAN': '广州', 'SZX': '深圳', 'CTU': '成都', 'HGH': '杭州', 'WUH': '武汉', 'SIA': '西安', 'CKG': '重庆', 'TAO': '青岛', 'CSX': '长沙', 'NKG': '南京', 'XMN': '厦门', 'KMG': '昆明', 'DLC': '大连', 'TSN': '天津', 'CGO': '郑州', 'SYX': '三亚', 'TNA': '济南', 'FOC': '福州', 'AAT': '阿勒泰', 'AKU': '阿克苏', 'AOG': '鞍山', 'AQG': '安庆', 'AVA': '安顺', 'AXF': '阿拉善左旗', 'MFM': '中国澳门', 'NGQ': '阿里', 'RHT': '阿拉善右旗', 'YIE': '阿尔山', 'BZX': '巴中', 'AEB': '百色', 'BAV': '包头', 'BFJ': '毕节', 'BHY': '北海', 'BJS,PKX': '北京(大兴国际机场)', 'BJS,PEK': '北京(首都国际机场)', 'BPL': '博乐', 'BSD': '保山', 'DBC': '白城', 'KJI': '布尔津', 'NBS': '白山', 'RLK': '巴彦淖尔', 'BPX': '昌都', 'CDE': '承德', 'CGD': '常德', 'CGQ': '长春', 'CHG': '朝阳', 'CIF': '赤峰', 'CIH': '长治', 'CWJ': '沧源', 'CZX': '常州', 'JUH': '池州', 'DAT': '大同', 'DAX': '达州', 'DCY': '稻城', 'DDG': '丹东', 'DIG': '迪庆', 'DLU': '大理', 'DNH': '敦煌', 'DOY': '东营', 'DQA': '大庆', 'HXD': '德令哈', 'DSN': '鄂尔多斯', 'EJN': '额济纳旗', 'ENH': '恩施', 'ERL': '二连浩特', 'FUG': '阜阳', 'FYJ': '抚远', 'FYN': '富蕴', 'GMQ': '果洛', 'GOQ': '格尔木', 'GYS': '广元', 'GYU': '固原', 'KHH': '中国高雄', 'KOW': '赣州', 'KWE': '贵阳', 'KWL': '桂林', 'AHJ': '红原', 'HAK': '海口', 'HCJ': '河池', 'HDG': '邯郸', 'HEK': '黑河', 'HET': '呼和浩特',
'HFE': '合肥', 'HIA': '淮安', 'HJJ': '怀化', 'HLD': '海拉尔', 'HMI': '哈密', 'HNY': '衡阳', 'HRB': '哈尔滨', 'HTN': '和田',
'HTT': '花土沟', 'HUN': '中国花莲', 'HUO': '霍林郭勒', 'HUZ': '惠州', 'HZG': '汉中', 'TXN': '黄山', 'XRQ': '呼伦贝尔',
'CYI': '中国嘉义', 'JDZ': '景德镇', 'JGD': '加格达奇', 'JGN': '嘉峪关', 'JGS': '井冈山', 'JIC': '金昌', 'JIU': '九江',
'JM1': '荆门', 'JMU': '佳木斯', 'JNG': '济宁', 'JNZ': '锦州', 'JSJ': '建三江', 'JXA': '鸡西', 'JZH': '九寨沟', 'KNH': '中国金门','SWA': '揭阳', 'KCA': '库车', 'KGT': '康定', 'KHG': '喀什', 'KJH': '凯里', 'KRL': '库尔勒', 'KRY': '克拉玛依', 'HZH': '黎平','JMJ': '澜沧', 'LCX': '龙岩', 'LFQ': '临汾', 'LHW': '兰州', 'LJG': '丽江', 'LLB': '荔波', 'LLV': '吕梁', 'LNJ': '临沧','LNL': '陇南', 'LPF': '六盘水', 'LXA': '拉萨', 'LYA': '洛阳', 'LYG': '连云港', 'LYI': '临沂', 'LZH': '柳州', 'LZO': '泸州','LZY': '林芝', 'LUM': '芒市', 'MDG': '牡丹江', 'MFK': '中国马祖', 'MIG': '绵阳', 'MXZ': '梅州', 'MZG': '中国马公', 'NZH': '满洲里','OHE': '漠河', 'KHN': '南昌', 'LZN': '中国南竿', 'NAO': '南充', 'NGB': '宁波', 'NLH': '宁蒗', 'NNG': '南宁', 'NNY': '南阳', 'NTG': '南通', 'PZI': '攀枝花','SYM': '普洱', 'BAR': '琼海', 'BPE': '秦皇岛', 'HBQ': '祁连', 'IQM': '且末', 'IQN': '庆阳', 'JIQ': '黔江','JJN': '泉州', 'JUZ': '衢州', 'NDG': '齐齐哈尔', 'RIZ': '日照', 'RKZ': '日喀则', 'RQA': '若羌', 'HPG': '神农架','QSZ': '莎车', 'SHE': '沈阳', 'SHF': '石河子', 'SJW': '石家庄', 'SQD': '上饶', 'SQJ': '三明', 'WDS': '十堰',
'WGN': '邵阳', 'YSQ': '松原', 'HYN': '台州', 'RMQ': '中国台中', 'TCG': '塔城', 'TCZ': '腾冲', 'TEN': '铜仁',
'TGO': '通辽', 'THQ': '天水', 'TLQ': '吐鲁番', 'TNH': '通化', 'TNN': '中国台南', 'TPE': '中国台北',
'TTT': '中国台东', 'TVS': '唐山', 'TYN': '太原', 'DTU': '五大连池', 'HLH': '乌兰浩特', 'UCB': '乌兰察布',
'URC': '乌鲁木齐', 'WEF': '潍坊', 'WEH': '威海', 'WNH': '文山', 'WNZ': '温州', 'WUA': '乌海', 'WUS': '武夷山',
'WUX': '无锡', 'WUZ': '梧州', 'WXN': '万州', 'WZQ': '乌拉特中旗', 'WSK': '巫山', 'ACX': '兴义', 'GXH': '夏河',
'HKG': '中国香港', 'JHG': '西双版纳', 'NLT': '新源', 'WUT': '忻州', 'XAI': '信阳', 'XFN': '襄阳', 'XIC': '西昌',
'XIL': '锡林浩特', 'XNN': '西宁', 'XUZ': '徐州', 'ENY': '延安', 'INC': '银川', 'LDS': '伊春',
'LLF': '永州','UYN': '榆林','YBP': '宜宾','YCU': '运城','YIC': '宜春','YIH': '宜昌','YIN': '伊宁','YIW': '义乌',
'YKH': '营口','YNJ': '延吉','YNT': '烟台','YNZ': '盐城','YTY': '扬州','YUS': '玉树','YYA': '岳阳','DYG': '张家界',
'HSN': '舟山','NZL': '扎兰屯','YZY': '张掖','ZAT': '昭通','ZHA': '湛江','ZHY': '中卫','ZQZ': '张家口','ZUH': '珠海','ZYI': '遵义'};


function displayResults(data) {
  // 清空之前的结果
  console.log(data);
  $('#results').empty();

  // 遍历返回的机票信息并将它们添加到页面中
    $.each(data, function(index, ticket) {

      var departure = regions_r[ticket.departure];
      var destination = regions_r[ticket.destination];
      var date = new Date(ticket.departure_time);
      var dateString = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      var html = '<div class="ticket-wrapper">' +
           '<div class="ticket">' +
           '<div class="ticket-price">' + ticket.price + '</div>' +
           '<div class="ticket-departure">' + departure + '</div>' +
           '<div class="ticket-destination">' + destination + '</div>' +
           '<div class="ticket-date">' + dateString + '</div>' +
           '</div></div>';

      $('#results').append(html);
    });


}
