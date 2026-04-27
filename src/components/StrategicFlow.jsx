import { Search, MonitorUp, Rocket, Activity } from 'lucide-react';
import './StrategicFlow.css';

export default function StrategicFlow() {
  const steps = [
    {
      num: '1',
      title: 'Discovery',
      desc: 'In-depth analysis of\nyour needs.',
      Icon: Search
    },
    {
      num: '2',
      title: 'Architecture',
      desc: 'Designing scalable\nsolutions.',
      Icon: MonitorUp
    },
    {
      num: '3',
      title: 'Deployment',
      desc: 'Seamless execution\nand rollout.',
      Icon: Rocket
    },
    {
      num: '4',
      title: 'Optimization',
      desc: 'Continuous improvement\nand monitoring.',
      Icon: Activity
    }
  ];

  return (
    <section className="strategic-flow section fade-in">
      <div className="bg-watermark watermark-flow">FLOW</div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="section__title text-center">
          OUR STRATEGIC <span className="highlight-text">FLOW</span>
        </h2>
        
        <div className="flow-container">
          <div className="flow-track"></div>
          {steps.map((step, index) => (
            <div className="flow-step" key={step.num}>
              <div className="flow-circle">
                <step.Icon size={32} color="#52d2ba" />
                <div className="flow-number">{step.num}</div>
              </div>
              <h3 className="flow-title">{step.title}</h3>
              <p className="flow-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
