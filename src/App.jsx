import React, { useState, useEffect } from 'react';
import {
  Brain,
  FileText,
  Activity,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Database,
  Play,
  Pause,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Server,
  Code,
  Layers,
  Target,
  Wind,
  Snowflake,
  Wifi
} from 'lucide-react';

// --- 数据配置 ---

const steps = [
  {
    id: 'intro',
    title: '引言：智能试飞变革',
    subtitle: 'AI Agents in Flight Test',
    description: '以国产大飞机 C919 为例，传统试飞面临周期长、风险高、数据分析难的挑战。引入大模型智能体（LLM Agents），构建“虚拟试飞工程师”，实现全生命周期的智能辅助。',
    icon: Brain,
    targetPart: 'all',
    color: 'text-blue-400',
    hudData: [
      { label: 'AIRCRAFT', value: 'C919-10101' },
      { label: 'SYSTEM', value: 'ONLINE' },
      { label: 'AI MODEL', value: 'GEMINI-ULTRA' }
    ],
    techDetail: {
      input: "海量试飞历史数据",
      process: "预训练 + 领域微调",
      output: "试飞垂域大模型"
    },
    cases: [
      {
        title: "C919 适航取证数字孪生",
        desc: "建立全生命周期数字档案，AI 辅助管理数万项符合性验证条目，提升取证效率。",
        effect: "digital-twin"
      },
      {
        title: "AG600 水上试飞风险评估",
        desc: "针对复杂海况/湖面环境，利用 AI 融合气象与水文数据，动态评估试飞窗口。",
        effect: "water-risk"
      },
      {
        title: "eVTOL 新型航空器验证",
        desc: "针对多旋翼气动干扰复杂的特点，利用大模型快速构建全新的测试验证体系。",
        effect: "vtol-grid"
      }
    ]
  },
  {
    id: 'design',
    title: '智能试验规划',
    subtitle: 'Generative Test Design',
    description: '针对 C919 复杂的适航取证需求，智能体利用 RAG 技术读取数万页 SRD 文档，自动拆解功能点，生成覆盖极端边界工况（如大侧风、积冰）的测试矩阵。',
    icon: FileText,
    targetPart: 'fuselage',
    color: 'text-purple-400',
    hudData: [
      { label: 'DOCS PARSED', value: '12,400 PGS' },
      { label: 'TEST CASES', value: '850 GEN' },
      { label: 'EDGE CASES', value: 'COVERED' }
    ],
    techDetail: {
      input: "需求规格书 (PDF) + 适航规章 (CCAR-25)",
      process: "RAG 检索增强 + CoT 逻辑链推理",
      output: "结构化测试用例 (JSON) & 试飞卡片"
    },
    cases: [
      {
        title: "自然结冰试飞规划",
        desc: "基于气象大模型预测结冰云层分布，自动规划最优试飞航线，减少“等天气”时间。",
        effect: "icing"
      },
      {
        title: "大侧风包线扩展设计",
        desc: "智能体分析历史机场风场数据，推荐最佳侧风试飞基地，并生成梯度加载方案。",
        effect: "crosswind"
      },
      {
        title: "航电系统逻辑覆盖",
        desc: "针对复杂的航电逻辑，自动生成 10 万+ 组合测试用例，确保 100% 逻辑分支覆盖。",
        effect: "avionics-code"
      }
    ]
  },
  {
    id: 'simulation',
    title: '虚拟试飞员 (仿真)',
    subtitle: 'Virtual Pilot Agent',
    description: '在铁鸟台或全动模拟机中，AI 智能体扮演试飞员。它能理解自然语言指令（如“做个过失速机动”），并像人类一样操作驾驶杆和油门，进行 7x24 小时疲劳测试。',
    icon: Cpu,
    targetPart: 'cockpit',
    color: 'text-cyan-400',
    hudData: [
      { label: 'PILOT AGENT', value: 'ENGAGED' },
      { label: 'SIM HOURS', value: '500+ HRS' },
      { label: 'SCENARIO', value: 'STALL RECOVERY' }
    ],
    techDetail: {
      input: "飞行状态参数 + 任务指令",
      process: "多模态感知 + 强化学习 (RLHF)",
      output: "精准操纵指令 (Stick/Throttle)"
    },
    cases: [
      {
        title: "过失速/尾旋改出验证",
        desc: "利用强化学习 Agent 在非线性气动区域探索改出策略，验证控制律鲁棒性。",
        effect: "stall-spin"
      },
      {
        title: "PIO (驾驶员诱发振荡) 预防",
        desc: "模拟不同反应延迟和增益的飞行员模型，提前发现人机耦合振荡风险。",
        effect: "pio-shake"
      },
      {
        title: "多系统故障级联注入",
        desc: "在仿真中注入“液压双失效+发电机故障”等极端复合故障，测试系统冗余度。",
        effect: "sys-failure"
      }
    ]
  },
  {
    id: 'monitoring',
    title: '实时监控与颤振预警',
    subtitle: 'Real-time Health Monitoring',
    description: '针对 C919 高速试飞中的颤振风险，智能体实时监控传感器流。利用时序大模型捕捉人眼难以察觉的微弱发散趋势，提前 500ms 发出告警并建议减速。',
    icon: Activity,
    targetPart: 'wings_engine',
    color: 'text-red-400',
    isWarning: true,
    hudData: [
      { label: 'WING VIB', value: 'WARNING' },
      { label: 'PREDICTION', value: '+500ms' },
      { label: 'ADVICE', value: 'REDUCE MACH' }
    ],
    techDetail: {
      input: "加速度计/应变片高频流数据",
      process: "Transformer 时序异常检测",
      output: "毫秒级安全告警 & 处置建议"
    },
    cases: [
      {
        title: "气动弹性颤振 (Flutter) 监测",
        desc: "实时辨识机翼振动模态阻尼比，当阻尼比低于安全阈值时毫秒级自动报警。",
        effect: "flutter-vibe"
      },
      {
        title: "发动机喘振/失速预警",
        desc: "监控进气道畸变和压气机压力脉动，预测发动机喘振边界，防止空中停车。",
        effect: "engine-surge"
      },
      {
        title: "结构极限载荷监控",
        desc: "在大机动试飞中，实时计算机翼根部和尾翼的弯矩载荷，防止结构永久变形。",
        effect: "struct-load"
      }
    ]
  },
  {
    id: 'analysis',
    title: '多模态数据讲评',
    subtitle: 'Automated Post-flight Analysis',
    description: '试飞结束后，AI 自动对齐飞行员语音（CVR）、驾驶舱视频和飞行数据（QAR）。针对异常事件（如重着陆），自动生成包含物理归因分析的讲评报告。',
    icon: Database,
    targetPart: 'tail',
    color: 'text-green-400',
    hudData: [
      { label: 'DATA FUSION', value: 'COMPLETED' },
      { label: 'ROOT CAUSE', value: 'ANALYZED' },
      { label: 'REPORT', value: 'GENERATED' }
    ],
    techDetail: {
      input: "语音 + 视频 + QAR 数据",
      process: "多模态对齐 + 知识图谱推理",
      output: "自动化试飞讲评报告"
    },
    cases: [
      {
        title: "重着陆事件深度归因",
        desc: "融合下沉率数据与飞行员操作视频，判定是气流扰动还是操作失误导致。",
        effect: "hard-landing"
      },
      {
        title: "噪声适航验证报告",
        desc: "自动处理地面麦克风阵列数据，生成噪声云图，快速输出适航合规性报告。",
        effect: "noise-map"
      },
      {
        title: "操稳特性参数辨识",
        desc: "自动截取试飞数据段，计算荷兰滚、短周期等模态参数，与仿真数据比对。",
        effect: "stability-axis"
      }
    ]
  }
];

// --- 组件：技术细节流程卡片 ---
const TechProcessCard = ({ detail, color }) => (
  <div className="absolute top-24 right-6 w-72 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4 shadow-2xl animate-fade-in-right z-20">
    <div className="text-xs font-mono text-slate-400 mb-3 border-b border-slate-700 pb-1 flex items-center">
      <Code size={12} className="mr-1" /> AI TECH STACK
    </div>

    <div className="space-y-4 relative">
      <div className="absolute left-[11px] top-2 bottom-6 w-[2px] bg-slate-700"></div>
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center z-10">
          <Database size={10} className="text-slate-400" />
        </div>
        <div className="text-[10px] text-slate-500 font-bold mb-0.5">INPUT / 输入</div>
        <div className="text-xs text-slate-200">{detail.input}</div>
      </div>
      <div className="relative pl-6">
        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border flex items-center justify-center z-10 ${color.replace('text-', 'border-')}`}>
          <Cpu size={10} className={color} />
        </div>
        <div className={`text-[10px] font-bold mb-0.5 ${color}`}>AI AGENT / 核心处理</div>
        <div className="text-xs text-white font-medium">{detail.process}</div>
        <div className={`absolute -inset-1 opacity-20 blur-sm rounded-lg ${color.replace('text-', 'bg-')} animate-pulse`}></div>
      </div>
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center z-10">
          <CheckCircle2 size={10} className="text-green-400" />
        </div>
        <div className="text-[10px] text-slate-500 font-bold mb-0.5">OUTPUT / 结果</div>
        <div className="text-xs text-slate-200">{detail.output}</div>
      </div>
    </div>
  </div>
);

// --- 组件：C919 风格飞机 SVG ---

const C919Plane = ({ activePart, isWarning, effect }) => {
  const baseStyle = "fill-slate-800 stroke-slate-600 stroke-1 transition-all duration-500";
  const activeStyle = isWarning
    ? "fill-red-900/50 stroke-red-500 stroke-2 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
    : "fill-blue-900/50 stroke-blue-400 stroke-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]";

  const getStyle = (part) => {
    if (activePart === 'all') return isWarning ? activeStyle : "fill-slate-800 stroke-blue-500 stroke-[1.5]";
    if (activePart === part) return activeStyle;
    if (activePart === 'wings_engine' && (['wing_l', 'wing_r', 'engine_l', 'engine_r', 'winglet_l', 'winglet_r'].includes(part))) return activeStyle;
    return baseStyle;
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center p-10 transition-transform duration-500 ${effect === 'stall-spin' ? 'rotate-12 scale-90' : ''}`}>

      {/* 全局效果：背景扫描线 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute top-0 animate-scan ${activePart === 'all' ? 'opacity-80' : 'opacity-10'}`}></div>
      </div>

      {/* --- 特效层 (Specific Case Effects) --- */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">

        {/* Intro Effects */}
        {effect === 'digital-twin' && (
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-8 opacity-20">
             {[...Array(36)].map((_,i) => <div key={i} className="border border-blue-500/30 rounded-full animate-pulse"></div>)}
          </div>
        )}
        {effect === 'water-risk' && (
           <div className="absolute bottom-20 w-full h-32 bg-gradient-to-t from-blue-900/40 to-transparent opacity-50 blur-xl animate-pulse"></div>
        )}
        {effect === 'vtol-grid' && (
           <div className="absolute w-[400px] h-[400px] border-2 border-dashed border-green-500/30 rounded-full animate-spin-slow"></div>
        )}

        {/* Design Effects */}
        {effect === 'icing' && (
          <>
            <div className="absolute top-[200px] left-[100px] text-cyan-200 animate-bounce"><Snowflake size={24} /></div>
            <div className="absolute top-[220px] right-[100px] text-cyan-200 animate-bounce" style={{animationDelay: '0.5s'}}><Snowflake size={32} /></div>
            <div className="absolute top-[180px] left-[300px] text-cyan-200 animate-bounce" style={{animationDelay: '0.2s'}}><Snowflake size={20} /></div>
          </>
        )}
        {effect === 'crosswind' && (
           <div className="absolute w-full h-full flex flex-col justify-center space-y-8 opacity-30">
             <div className="w-full h-[2px] bg-white translate-x-[-100px] animate-wind"></div>
             <div className="w-full h-[2px] bg-white translate-x-[-200px] animate-wind" style={{animationDelay: '0.3s'}}></div>
             <div className="w-full h-[2px] bg-white translate-x-[-50px] animate-wind" style={{animationDelay: '0.6s'}}></div>
           </div>
        )}
        {effect === 'avionics-code' && (
           <div className="absolute top-[100px] w-48 text-[10px] font-mono text-green-500 opacity-70 text-center">
             0101010111001... <br/> SYS_CHK: PASS <br/> BUS_A: OK
           </div>
        )}

        {/* Monitoring Effects */}
        {(effect === 'flutter-vibe' || activePart === 'wings_engine') && (
           <div className="absolute w-[400px] h-[100px] flex items-center justify-center opacity-50">
               <div className="w-full h-px bg-red-500 animate-pulse"></div>
           </div>
        )}
        {(effect === 'engine-surge') && (
          <>
            <div className="absolute mt-[80px] ml-[-120px] w-12 h-12 rounded-full border-2 border-red-500 animate-ping"></div>
            <div className="absolute mt-[80px] mr-[-120px] w-12 h-12 rounded-full border-2 border-red-500 animate-ping" style={{animationDelay:'0.4s'}}></div>
          </>
        )}
        {effect === 'struct-load' && (
           <div className="absolute w-[300px] h-[50px] top-[260px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent blur-md"></div>
        )}

        {/* Simulation Effects */}
        {effect === 'sys-failure' && (
           <div className="absolute top-[260px] flex space-x-20">
             <AlertTriangle className="text-red-500 animate-pulse" />
             <AlertTriangle className="text-red-500 animate-pulse" />
           </div>
        )}
        {effect === 'pio-shake' && (
           <div className="absolute text-orange-400 font-bold text-lg animate-pulse">PIO WARNING</div>
        )}

        {/* Analysis Effects */}
        {effect === 'hard-landing' && (
           <div className="absolute bottom-[100px] flex flex-col items-center">
             <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-red-500 animate-bounce"></div>
             <div className="w-20 h-2 bg-red-500/50 rounded-full blur-sm mt-2"></div>
           </div>
        )}
        {effect === 'noise-map' && (
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] border border-green-500/20 rounded-full animate-ping-slow"></div>
              <div className="w-[300px] h-[300px] border border-yellow-500/20 rounded-full animate-ping-slow" style={{animationDelay:'1s'}}></div>
           </div>
        )}
         {effect === 'stability-axis' && (
           <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="w-px h-[400px] bg-blue-400"></div>
              <div className="h-px w-[400px] bg-blue-400"></div>
              <div className="absolute w-[200px] h-[200px] border border-blue-400 rounded-full"></div>
           </div>
        )}

      </div>

      <svg viewBox="0 0 600 600" className={`w-full h-full max-w-2xl drop-shadow-2xl z-10 ${effect === 'flutter-vibe' ? 'animate-shake' : ''}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* --- C919 Geometry --- */}
        <path d="M260,240 L120,290 L100,280 L110,270 L260,220 Z" className={getStyle('wing_l')} /> {/* 左翼 */}
        <path d="M340,240 L480,290 L500,280 L490,270 L340,220 Z" className={getStyle('wing_r')} /> {/* 右翼 */}
        <path d="M100,280 L90,260 L100,265 Z" className={getStyle('winglet_l')} />
        <path d="M500,280 L510,260 L500,265 Z" className={getStyle('winglet_r')} />

        {/* Engines */}
        <g className="transition-transform duration-300 hover:scale-105 origin-center">
            <path d="M180,270 L170,260 L190,250 L200,270 Z" className="fill-slate-900 stroke-none opacity-50" />
            <rect x="170" y="265" width="25" height="45" rx="4" className={getStyle('engine_l')} />
            <rect x="175" y="310" width="15" height="5" className="fill-blue-500/20" />
        </g>
        <g className="transition-transform duration-300 hover:scale-105 origin-center">
            <path d="M420,270 L430,260 L410,250 L400,270 Z" className="fill-slate-900 stroke-none opacity-50" />
            <rect x="405" y="265" width="25" height="45" rx="4" className={getStyle('engine_r')} />
            <rect x="410" y="310" width="15" height="5" className="fill-blue-500/20" />
        </g>

        {/* Tail */}
        <path d="M280,480 L220,530 L380,530 L320,480 Z" className={getStyle('tail')} />
        <path d="M292,460 L292,540 L308,540 L308,460 Z" className={getStyle('fuselage')} />
        <path d="M295,430 L295,520 L305,520 L305,430 Z" className={getStyle('tail')} />

        {/* Fuselage */}
        <path d="M270,100 Q300,50 330,100 L330,480 Q300,550 270,480 Z" className={getStyle('fuselage')} />
        <path d="M280,110 L320,110 L325,125 L275,125 Z" className={getStyle('cockpit')} />
        <line x1="300" y1="110" x2="300" y2="125" className="stroke-slate-900 stroke-1" />

        {/* Decor Circles */}
        <circle cx="300" cy="300" r="180" className="stroke-slate-700 stroke-[0.5] fill-none stroke-dasharray-10 animate-spin-slow" style={{animationDuration: '30s'}} />
        <circle cx="300" cy="300" r="240" className="stroke-slate-800 stroke-[0.5] fill-none" />

        {/* Connection Line */}
        {activePart !== 'all' && (
           <g className="animate-pulse opacity-50">
             <circle cx="300" cy="300" r="5" className="fill-blue-400" />
             <line x1="300" y1="300" x2="500" y2="150" className="stroke-blue-400 stroke-1 stroke-dasharray-4" />
           </g>
        )}
      </svg>
    </div>
  );
};

// --- 主应用组件 ---

export default function FlightTestPresentation() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeCaseIdx, setActiveCaseIdx] = useState(null); // 新增：当前激活的 Case 索引
  const [isPlaying, setIsPlaying] = useState(false);

  // 自动播放逻辑
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIdx(prev => (prev + 1) % steps.length);
        setActiveCaseIdx(null); // 切换步骤时重置 Case
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // 手动切换时也重置 Case
  const handleStepChange = (newIdx) => {
    setCurrentIdx(newIdx);
    setActiveCaseIdx(null);
  };

  const currentStep = steps[currentIdx];
  const Icon = currentStep.icon;
  const currentEffect = activeCaseIdx !== null ? currentStep.cases[activeCaseIdx].effect : null;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">

      {/* ---------------- 左侧：控制与叙述区 ---------------- */}
      <div className="w-full md:w-1/3 flex flex-col border-r border-slate-800 bg-slate-900/50 relative z-10 shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-blue-500 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-bold tracking-[0.2em]">C919 INTELLIGENT TEST</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight">
            基于大模型的<br/>飞机试验设计与测试
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8">
            <div className="flex space-x-1 mb-8">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => handleStepChange(idx)}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentIdx 
                      ? `bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_#3b82f6]` 
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div key={currentIdx} className="animate-fade-in-up">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg bg-slate-800/80 border border-slate-700 ${currentStep.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${currentStep.color}`}>{currentStep.title}</h2>
                  <p className="text-xs text-slate-500 font-mono uppercase">{currentStep.subtitle}</p>
                </div>
              </div>

              <div className="prose prose-invert prose-sm mb-6">
                <p className="text-slate-300 leading-relaxed text-base text-justify">
                  {currentStep.description}
                </p>
              </div>

              {/* 典型应用案例列表 (Interactive) */}
              {currentStep.cases && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Layers size={12} className="mr-2" />
                    典型应用案例 (点击查看演示)
                  </div>
                  {currentStep.cases.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveCaseIdx(index)}
                      className={`p-3 rounded border-l-2 transition-all cursor-pointer group relative overflow-hidden ${
                        activeCaseIdx === index 
                        ? 'bg-blue-900/30 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                        : 'bg-slate-800/40 border-slate-600 hover:bg-slate-800 hover:border-blue-400'
                      }`}
                    >
                      {activeCaseIdx === index && (
                         <div className="absolute right-2 top-2 text-blue-400 animate-pulse"><ScanLine size={14} /></div>
                      )}
                      <div className={`flex items-center text-sm font-bold transition-colors ${activeCaseIdx === index ? 'text-blue-300' : 'text-slate-200 group-hover:text-blue-300'}`}>
                        <Target size={12} className={`mr-2 transition-opacity ${activeCaseIdx === index ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} />
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 pl-5 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Agent Thought Process */}
              <div className="mt-4 p-4 bg-black/40 rounded border border-slate-800 font-mono text-xs text-green-400/80 shadow-inner">
                <div className="flex items-center mb-3 text-slate-500 border-b border-slate-800 pb-2">
                   <Brain size={12} className="mr-2" />
                   <span className="tracking-wider">AGENT THOUGHT PROCESS</span>
                </div>
                <div className="typing-effect space-y-1">
                  <div className="flex"><span className="w-4 opacity-50">1.</span> <span>Retrieving context: {currentStep.subtitle}...</span></div>
                  <div className="flex"><span className="w-4 opacity-50">2.</span> <span>Analyzing: {activeCaseIdx !== null ? currentStep.cases[activeCaseIdx].title : "General Scenario"}</span></div>
                  {currentStep.isWarning || (activeCaseIdx !== null && ['stall-spin', 'flutter-vibe'].includes(currentEffect)) ? (
                    <div className="flex text-red-400 animate-pulse font-bold"><span className="w-4 opacity-50">3.</span> <span>!!! ANOMALY DETECTED !!!</span></div>
                  ) : (
                    <div className="flex"><span className="w-4 opacity-50">3.</span> <span>Optimizing strategy...</span></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isPlaying 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? '自动演示' : '开始演示'}</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => handleStepChange((currentIdx - 1 + steps.length) % steps.length)}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleStepChange((currentIdx + 1) % steps.length)}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 右侧：可视化演示区 ---------------- */}
      <div className="flex-1 relative bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        {/* 背景动效 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none"></div>

        {/* 顶部 HUD */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none z-20">
          <div className="flex flex-col">
            <div className="text-xs font-mono text-slate-500">PROJECT ID</div>
            <div className="text-sm font-bold text-slate-300">COMAC C919-TEST</div>
          </div>
          {/* HUD 面板 */}
          <div className="pointer-events-auto">
             <div className={`p-4 rounded-lg border backdrop-blur-md transition-colors duration-300 ${currentStep.isWarning ? 'bg-red-950/40 border-red-500/50' : 'bg-blue-950/40 border-blue-500/50'}`}>
                <div className="flex items-center space-x-2 mb-3 border-b border-white/10 pb-2">
                  <ScanLine size={16} className={currentStep.isWarning ? 'text-red-400' : 'text-blue-400'} />
                  <span className="text-xs font-mono font-bold tracking-widest text-white/80">实时遥测数据</span>
                </div>
                <div className="space-y-2">
                  {currentStep.hudData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center w-40 font-mono text-xs">
                      <span className="text-slate-400">{item.label}</span>
                      <span className={currentStep.isWarning ? 'text-red-300 font-bold' : 'text-blue-300 font-bold'}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>

        {/* 核心可视化：C919 飞机 */}
        <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
          <C919Plane
            activePart={currentStep.targetPart}
            isWarning={currentStep.isWarning}
            effect={currentEffect}
          />

          {/* AI Tech Stack 卡片 */}
          <TechProcessCard detail={currentStep.techDetail} color={currentStep.color} />

          {/* 警告弹窗 (基于 Warning 或特定高危 Case) */}
          {(currentStep.isWarning || (currentEffect && ['stall-spin', 'flutter-vibe', 'sys-failure'].includes(currentEffect))) && (
            <div className="absolute bottom-12 flex items-center bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 rounded backdrop-blur-sm animate-bounce z-30">
              <AlertTriangle className="mr-3" />
              <div>
                <div className="font-bold text-sm">警告：高危工况检测中</div>
                <div className="text-xs opacity-80">AI 建议：启动保护控制律 (Protective Law)</div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 text-center">
           <p className="text-[10px] text-slate-600 font-mono tracking-widest">
             MODEL: C919 | POWERED BY LLM AGENTS
           </p>
        </div>
      </div>

      {/* 样式定义 */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes wind {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(-100px); opacity: 1; }
        }
        .animate-wind {
          animation: wind 1s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(1deg); }
          75% { transform: translateX(2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}