import './Caca.scss';

export interface ComponentProps {
  param: string
}

const Component = ({param}: ComponentProps) => {
  return <div>Test {param}</div>
}

export default Component;
