/**
 * 教师档案数据
 *
 * id 用于 URL query param: teacher-detail.html?id=<id>
 * 字段统一为简单字符串/字符串数组，便于在 teacher-detail.html 上做最朴素的字符串渲染。
 *
 * 若新增老师，按现有结构追加一项；首页 index.html 的师资 carousel 需要同步加链接。
 */

/**
 * @typedef {Object} TeacherProfile
 * @property {string} name           中文姓名
 * @property {string} honorific      职称（教授 / 博士 / 总工 / 副教授 等）
 * @property {string} position       一句话定位（如「智能制造学科带头人」）
 * @property {string} photo          头像路径，绝对路径相对站点根
 * @property {string} bio            一段自述 / 介绍文案
 * @property {string[]} achievements 学术成果 / 项目 / 奖项条目
 * @property {string[]} courses      主讲课程
 * @property {string} email          公开邮箱
 * @property {string} office         办公地点
 */

/** @type {Record<string, TeacherProfile>} */
export const TEACHERS = {
  'zhang-moqiu': {
    name: '张墨秋',
    honorific: '教授',
    position: '智能制造学科带头人',
    photo: '/img/person-1.jpg',
    bio: '深耕智能制造领域二十余年，主持多项国家及省部级科研项目，长期致力于将先进制造工艺转化为可落地的产业培训课程，推动深技大继续教育与大湾区智能制造产业链的深度耦合。',
    achievements: [
      '主持国家自然科学基金面上项目「面向柔性制造的多机器人协同调度方法」',
      '获广东省科学技术进步二等奖（2022）',
      '出版《智能制造系统导论》教材（机械工业出版社）',
      '建设国家级一流本科课程《智能制造系统》'
    ],
    courses: ['智能制造系统', '工业互联网与边缘计算', '机器人工程导论'],
    email: 'zhang.moqiu@sztu.edu.cn',
    office: '工学院 A 栋 305'
  },

  'li-mingde': {
    name: '李明德',
    honorific: '博士',
    position: '数字化设计特聘专家',
    photo: '/img/person-2.jpg',
    bio: '长期任职于头部工业设计企业，主导过多款获红点奖、IF 奖的消费电子产品。受聘担任继续教育学院特聘专家，专注将工业界最新方法论引入面向在职工程师的非学历培训。',
    achievements: [
      '红点设计奖 / IF 设计奖 多次获奖项目主导设计师',
      '主持深圳市发改委「数字化产品设计公共服务平台」建设',
      '担任广东工业设计协会理事'
    ],
    courses: ['数字化产品设计实战', 'CAD 高级建模', '工业设计方法论'],
    email: 'li.mingde@sztu.edu.cn',
    office: '设计学院实训中心 B-208'
  },

  'chen-wanqing': {
    name: '陈婉清',
    honorific: '教授',
    position: '终身教育研究中心主任',
    photo: '/img/person-3.jpg',
    bio: '深耕终身教育理论与实践研究，主持多项关于成人学习动机与学分银行机制的国家课题。是学院乐龄教育、金色年华系列课程体系的总设计师。',
    achievements: [
      '主持国家社科基金项目「粤港澳大湾区学分银行机制研究」',
      '出版《终身教育体系建设导论》',
      '入选广东省「特支计划」教学名师'
    ],
    courses: ['终身教育导论', '成人学习心理学', '老年教育课程设计'],
    email: 'chen.wanqing@sztu.edu.cn',
    office: '继续教育学院 C 栋 402'
  },

  'zhao-zihao': {
    name: '赵子豪',
    honorific: '总工',
    position: '产教融合基地实训导师',
    photo: '/img/person-4.jpg',
    bio: '原大型装备制造企业总工程师，专精精密加工与自动化产线集成。受聘后牵头建立 8 个校企联合实训基地，主导面向技师/高级技师的实战课程开发。',
    achievements: [
      '主导 8 个校企联合实训基地建设',
      '广东省高技能人才培养示范基地评审专家',
      '主编《精密加工工艺与设备》技师培训教材'
    ],
    courses: ['精密加工实战', '自动化产线集成与调试', '现场工艺管理'],
    email: 'zhao.zihao@sztu.edu.cn',
    office: '校企联合实训中心一号馆'
  },

  'wang-jianguo': {
    name: '王建国',
    honorific: '教授',
    position: '工业互联网首席专家',
    photo: '/img/person-5.jpg',
    bio: '在工业互联网平台架构与工业大数据建模方面具有十余年研究与落地经验，主持过多个亿元级工业互联网项目，所建模型已部署到大湾区数十家智能工厂。',
    achievements: [
      '主持国家重点研发计划「工业互联网平台关键技术与应用」子课题',
      '获中国通信学会科学技术一等奖',
      '担任工业互联网产业联盟专家委员'
    ],
    courses: ['工业互联网平台架构', '工业大数据分析', '边缘计算与时序数据库'],
    email: 'wang.jianguo@sztu.edu.cn',
    office: '大数据学院 D 栋 318'
  },

  'lin-xiaoyue': {
    name: '林晓月',
    honorific: '博士',
    position: '人工智能应用研究员',
    photo: '/img/person-6.jpg',
    bio: '专注计算机视觉与多模态生成模型的产业化落地，主持开发面向继续教育的 AI 实训平台，将前沿模型转译为可上手的实战课程，服务在职工程师 AI 化转型。',
    achievements: [
      '主持广东省自然科学基金「面向工业质检的少样本视觉算法研究」',
      '在 CVPR / ICCV 等顶级会议发表论文若干',
      '主导继续教育 AI 实战平台建设'
    ],
    courses: ['深度学习与计算机视觉', '生成式 AI 应用实战', 'AI 工程化部署'],
    email: 'lin.xiaoyue@sztu.edu.cn',
    office: '人工智能学院 E 栋 506'
  }
};

/**
 * 获取教师档案，找不到时返回 null。
 * @param {string | null | undefined} id
 * @returns {TeacherProfile | null}
 */
export function getTeacherById(id) {
  if (!id || typeof id !== 'string') return null;
  return Object.prototype.hasOwnProperty.call(TEACHERS, id) ? TEACHERS[id] : null;
}
