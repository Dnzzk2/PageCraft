export type UtilCode = {
  title: string;
  description: string;
  code: string;
  category:
    | "数据处理"
    | "文件处理"
    | "身份证处理"
    | "通用工具"
    | "字符串处理"
    | "URL处理";
};

export const UTILS_CODE: UtilCode[] = [
  {
    title: "Table Response",
    description:
      "处理ProTable和Table的响应数据，主要用于处理分页数据。当前页数据为空时，自动跳转到上一页。",
    category: "数据处理",
    code: `/**
 * @param {React.MutableRefObject} actionRef proTable实例
 * @param {Object} res 请求响应的数据
 * @param {String} type 表格类型 table | proTable（default）
 * */
export function handleTableResponse(config) {
  const { actionRef, res, type = 'proTable' } = config;
  if (res) {
    const { current, pageNum, pageSize, total, params, data } = res.data;
    //判断当前页面不是第一页，并且数据又为空的情况
    if ((params?.length === 0 || data?.length === 0) && (current > 1 || pageNum > 1)) {
      if (type === 'proTable') {
        //异步设置page信息，并且重新加载
        setTimeout(() => {
          actionRef.current.setPageInfo({
            current: (current || pageNum) - 1,
            pageSize: pageSize,
            total: total,
          });
          actionRef.current.reload();
        }, 0);
      } else {
        //ui层判断reload如果为true，就把当前页码减一后再次请求
        return {
          data: [],
          reload: true,
        };
      }
    }
    return {
      data: params ?? data,
      total: total,
    };
  } else {
    return {
      data: [],
      total: 0,
    };
  }
}`,
  },
  {
    title: "生成GUID",
    description: "生成一个随机的GUID/UUID。",
    category: "通用工具",
    code: `export function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}`,
  },
  {
    title: "图片上传压缩",
    description: "上传图片前进行压缩和大小校验。",
    category: "文件处理",
    code: `/**
 * 上传前压缩校验
 * @param {File} file实例
 * @param {Number} maxSize 文件大小，MB
 */
export const beforeUploadCompress = (file, maxSize = 2) => {
  return new Promise((resolve) => {
    new Compressor(file, {
      quality: 0.4,
      success(result) {
        if (result.size / 1024 > maxSize * 1024) {
          message.error(\`请选择大小<=\${maxSize}MB的图片\`);
          resolve(Upload.LIST_IGNORE);
        } else {
          resolve(result);
        }
      },
      error(err) { 
        resolve(Upload.LIST_IGNORE);
      }
    });
  });
};`,
  },
  {
    title: "数组转树结构",
    description: "将扁平数组转换为树状结构。",
    category: "数据处理",
    code: `/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array = [], id = 'id', pid = 'parentId', children = 'children') {
  let data = lodash.cloneDeep(array);
  let result = [];
  let hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });
  data.forEach((item) => {
    let hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}`,
  },
  {
    title: "身份证信息工具",
    description: "根据身份证号码获取年龄和性别信息。",
    category: "身份证处理",
    code: `/**
 * 根据身份证获取年龄
 * @param {String} idCardNumber 
 */
export function calculateAgeFromIdCard(idCardNumber) {  
  const birthYear = parseInt(idCardNumber.substr(6, 4))
  const birthMonth = parseInt(idCardNumber.substr(10, 2))
  const birthDay = parseInt(idCardNumber.substr(12, 2))

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()

  let age = currentYear - birthYear
  let monthDiff = 0
  let dayDiff = 0

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--
    monthDiff = 12 - birthMonth + currentMonth
  } else {
    monthDiff = currentMonth - birthMonth
  }

  if (monthDiff < 0) {
    age--
    monthDiff += 12
  }

  dayDiff = currentDay - birthDay

  if (dayDiff < 0) {
    monthDiff--
    const lastDayOfMonth = new Date(currentYear, currentMonth - 1 - (monthDiff > 0 ? 1 : 0), 0).getDate()
    dayDiff = lastDayOfMonth + dayDiff
  }

  if (age > 0) return age + '岁'
  if (monthDiff > 0) return monthDiff + '个月'
  return dayDiff + '天'
}

/**
 * 根据身份证获取性别 
 * @param   {String}    str 身份证号码
 * @return  {String}    1 男 , 2 女  
 */
export function getSexByIdCard(str) {
  if (str.length == 18) {
    return str.charAt(16) % 2 == 0 ? "2" : "1";
  } else if (str.length == 15) {
    return str.charAt(14) % 2 == 0 ? "2" : "1";
  }
  return "";
}`,
  },
  {
    title: "身份证号码加密",
    description: "对身份证号码进行加密处理，保留首尾字符。",
    category: "身份证处理",
    code: `/**
 * 对身份证进行加密
 * @param {String} p 身份证
 */
export const encryIdCard = (p) => {
  if (p.length === undefined) return '';
  var len = p.length - 10;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += p[i + 4];
  }
  return (xing = p.slice(0, 1) + '***' + xing + '*****' + p.slice(-1));
};`,
  },
  {
    title: "手机号码加密",
    description: "对手机号码进行加密，可自定义保留前后位数。",
    category: "字符串处理",
    code: `/**
 * 手机号码进行加密
 * @param {String} p 手机号码
 * @param {Number} frontLen 前面需要保留几位
 * @param {Number} endLen 后面需要保留几位  
 */
export const encryPhoneNum = (p, frontLen = 3, endLen = 4) => {
  if (p.length === undefined) return '';
  var len = p.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return p.substring(0, frontLen) + xing + p.substring(p.length - endLen);
};`,
  },
  {
    title: "金额格式化",
    description: "将数字金额格式化为指定货币格式。",
    category: "数据处理",
    code: `/**
 * 金额格式化
 * @param {Number} amount 金额
 * @param {Number} currency 货币，默认为CNY人民币
 * @param {Number} locale 区域，默认为zh-CN中国  
 */
export function formatCurrency(amount, currency = 'CNY', locale = 'zh-CN') {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}`,
  },
  {
    title: "删除URL参数",
    description: "从URL中删除指定的search参数。",
    category: "URL处理",
    code: `/**
 * 删除URL中指定search参数,会将参数值一起删除
 * @param {string} url 地址字符串
 * @param {array} aParam 要删除的参数key数组，如['name','age']
 * @return {string} 返回新URL字符串
 */
export function ridUrlParam(url, aParam) {
  aParam.forEach(item => {
    const fromindex = url.indexOf(\`\${item}=\`) //必须加=号，避免参数值中包含item字符串
    if (fromindex !== -1) {
      // 通过url特殊符号，计算出=号后面的的字符数，用于生成replace正则
      const startIndex = url.indexOf('=', fromindex)
      const endIndex = url.indexOf('&', fromindex)
      const hashIndex = url.indexOf('#', fromindex)

      let reg;
      if (endIndex !== -1) { // 后面还有search参数的情况
        const num = endIndex - startIndex
        reg = new RegExp(\`\${item}=.{\${num}}\`)
        url = url.replace(reg, '')
      } else if (hashIndex !== -1) { // 有hash参数的情况
        const num = hashIndex - startIndex - 1
        reg = new RegExp(\`&?\${item}=.{\${num}}\`)
        url = url.replace(reg, '')
      } else { // search参数在最后或只有一个参数的情况
        reg = new RegExp(\`&?\${item}=.+\`)
        url = url.replace(reg, '')
      }
    }
  });
  const noSearchParam = url.indexOf('=')
  if (noSearchParam === -1) {
    url = url.replace(/\\?/, '') // 如果已经没有参数，删除？号
  }
  return url
}`,
  },
  {
    title: "首字母排序",
    description: "根据首字母对数组进行排序，支持对象数组和字符串数组。",
    category: "数据处理",
    code: `/**
 * @desc 根据首字母进行排序，数据格式为对象数组或字符串数组
 * @param {object | String[]} list
 * @param {String} key  需要根据对象中的哪个字段进行排序，仅当list为对象数组时需要传入
 * */
export const spellSort = (list, key) => {
  if (list.length === 0) {
    return []
  }

  const type = typeof list[0]

  let pinyinArray = [];
  let reg = /^[A-Za-z]*$/;
  list.map((v) => {
    var ken = Pinyin.getSpell(type === 'object' ? v[key]?.[0] : v?.[0], function (charactor, spell) {
      return spell[1];
    });
    pinyinArray.push({ _val: type === 'string' ? v : null, ...v, spell: reg.test(ken[0]) ? ken[0].toUpperCase() : '#' });
  });

  var letters = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ#'.split('');
  pinyinArray.forEach((item) => {
    const letter = item.spell;
    const sortIndex = letters.findIndex((x) => x === letter);
    item.sort = sortIndex;
  });
  pinyinArray.sort((a, b) => a.sort - b.sort);

  return type === 'object' ? pinyinArray : pinyinArray.map(item => item._val)
};`,
  },
  {
    title: "复制文本",
    description: "复制文本到剪贴板，兼容不同浏览器。",
    category: "通用工具",
    code: `/**
 * @description: 复制文本内容
 * @param {string} text 文本内容
 */
export const copyText = (text = '') => {
  // http不支持
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success('复制成功！');
      },
      () => {
        message.warning('复制失败！');
      }
    );
  } else {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.top = '-10000px';
    input.style.zIndex = '-999';
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    if (!result) {
      message.warning(
        '当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作！'
      );
    } else {
      message.success('复制成功！');
    }
  }
};`,
  },
];
